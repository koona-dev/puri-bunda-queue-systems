import type { DragEvent } from "react";
import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  CheckCircle2,
  Clock3,
  ListFilter,
  PhoneCall,
  Waves,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type QueueStatus = "waiting" | "call" | "done";
type QueuePriority = "urgent" | "regular" | "vip";

type QueueItem = {
  id: string;
  customer: string;
  loketNumber: number;
  clinicName: string;
  priority: QueuePriority;
  status: QueueStatus;
};

type SortMode = "manual" | "clinic" | "customer" | "loket";

const statusOrder: QueueStatus[] = ["waiting", "call", "done"];

const statusCopy: Record<QueueStatus, { label: string; hint: string }> = {
  waiting: { label: "Waiting", hint: "Queued patients in the lobby" },
  call: { label: "Calling", hint: "Currently being called to the desk" },
  done: { label: "Done", hint: "Finished and cleared from queue" },
};

const statusTone: Record<QueueStatus, string> = {
  waiting: "bg-amber-50 border-amber-100",
  call: "bg-blue-50 border-blue-100",
  done: "bg-emerald-50 border-emerald-100",
};

const priorityTone: Record<QueuePriority, string> = {
  urgent: "bg-destructive/10 text-destructive border-destructive/50",
  vip: "bg-purple-50 text-purple-700 border-purple-200",
  regular: "bg-muted text-muted-foreground border-transparent",
};

const initialQueues: QueueItem[] = [
  {
    id: "Q-1082",
    customer: "Ni Luh Sari",
    loketNumber: 3,
    clinicName: "Klinik Kebidanan",
    priority: "urgent",
    status: "waiting",
  },
  {
    id: "Q-1083",
    customer: "Made Surya",
    loketNumber: 1,
    clinicName: "Klinik Umum",
    priority: "regular",
    status: "waiting",
  },
  {
    id: "Q-1084",
    customer: "Ayu Maharani",
    loketNumber: 2,
    clinicName: "Klinik Anak",
    priority: "vip",
    status: "call",
  },
  {
    id: "Q-1085",
    customer: "Wayan Putra",
    loketNumber: 5,
    clinicName: "Klinik Gigi",
    priority: "regular",
    status: "call",
  },
  {
    id: "Q-1086",
    customer: "Kadek Bayu",
    loketNumber: 4,
    clinicName: "Klinik Bedah Minor",
    priority: "urgent",
    status: "waiting",
  },
  {
    id: "Q-1087",
    customer: "Gusti Ayu Lestari",
    loketNumber: 2,
    clinicName: "Klinik Anak",
    priority: "regular",
    status: "done",
  },
  {
    id: "Q-1088",
    customer: "I Made Adi",
    loketNumber: 1,
    clinicName: "Klinik Umum",
    priority: "vip",
    status: "waiting",
  },
  {
    id: "Q-1089",
    customer: "Komang Dewi",
    loketNumber: 6,
    clinicName: "Klinik Rehab Medik",
    priority: "regular",
    status: "done",
  },
];

const priorityWeight = (priority: QueuePriority) => {
  if (priority === "urgent") return 0;
  if (priority === "vip") return 1;
  return 2;
};

const groupByStatus = (queues: QueueItem[]) =>
  statusOrder.reduce<Record<QueueStatus, QueueItem[]>>(
    (acc, status) => ({
      ...acc,
      [status]: queues.filter((queue) => queue.status === status),
    }),
    { waiting: [], call: [], done: [] }
  );

const WaitingIcon = () => <Clock3 className="h-4 w-4 text-amber-500" />;
const CallIcon = () => <PhoneCall className="h-4 w-4 text-blue-500" />;
const DoneIcon = () => <CheckCircle2 className="h-4 w-4 text-emerald-500" />;

export default function Queues() {
  const [queuesByStatus, setQueuesByStatus] = useState<
    Record<QueueStatus, QueueItem[]>
  >(() => groupByStatus(initialQueues));
  const [urgentFirst, setUrgentFirst] = useState(true);
  const [sortMode, setSortMode] = useState<SortMode>("manual");
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<QueueStatus | null>(null);

  const displayedQueues = useMemo(() => {
    const sortQueues = (list: QueueItem[]) => {
      const withIndex = list.map((item, index) => ({ item, index }));

      withIndex.sort((a, b) => {
        if (urgentFirst) {
          const priorityDiff =
            priorityWeight(a.item.priority) - priorityWeight(b.item.priority);
          if (priorityDiff !== 0) return priorityDiff;
        }

        if (sortMode === "clinic") {
          const diff = a.item.clinicName.localeCompare(b.item.clinicName);
          if (diff !== 0) return diff;
        } else if (sortMode === "customer") {
          const diff = a.item.customer.localeCompare(b.item.customer);
          if (diff !== 0) return diff;
        } else if (sortMode === "loket") {
          const diff = a.item.loketNumber - b.item.loketNumber;
          if (diff !== 0) return diff;
        }

        return a.index - b.index;
      });

      return withIndex.map(({ item }) => item);
    };

    return statusOrder.reduce<Record<QueueStatus, QueueItem[]>>(
      (acc, status) => ({
        ...acc,
        [status]: sortQueues(queuesByStatus[status]),
      }),
      { waiting: [], call: [], done: [] }
    );
  }, [queuesByStatus, sortMode, urgentFirst]);

  const moveQueue = (
    queueId: string,
    targetStatus: QueueStatus,
    targetId?: string
  ) => {
    setQueuesByStatus((prev) => {
      let moving: QueueItem | undefined;
      const next: Record<QueueStatus, QueueItem[]> = {
        waiting: [],
        call: [],
        done: [],
      };

      statusOrder.forEach((status) => {
        prev[status].forEach((item) => {
          if (item.id === queueId) {
            moving = { ...item, status: targetStatus };
            return;
          }

          next[status].push(item);
        });
      });

      if (!moving) return prev;

      const targetList = next[targetStatus];
      const targetIndex = targetId
        ? targetList.findIndex((item) => item.id === targetId)
        : -1;
      const insertAt = targetIndex >= 0 ? targetIndex : targetList.length;

      targetList.splice(insertAt, 0, moving);

      return next;
    });
  };

  const handleDrop = (
    event: DragEvent<HTMLElement>,
    status: QueueStatus,
    targetId?: string
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const droppedId = event.dataTransfer.getData("text/plain");
    if (!droppedId) return;

    moveQueue(droppedId, status, targetId);
    setDraggingId(null);
    setDropTarget(null);
  };

  const handleStatusSelect = (queueId: string, status: QueueStatus) => {
    moveQueue(queueId, status);
  };

  const resetQueues = () => {
    setQueuesByStatus(groupByStatus(initialQueues));
    setSortMode("manual");
    setUrgentFirst(true);
  };

  const stats = useMemo(
    () =>
      statusOrder.map((status) => ({
        status,
        count: displayedQueues[status].length,
        urgent: displayedQueues[status].filter(
          (queue) => queue.priority === "urgent"
        ).length,
      })),
    [displayedQueues]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Klinik Queue Board
          </h1>
          <p className="text-sm text-muted-foreground">
            Prioritize urgent patients, reorder queues, and update each counter
            status.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Checkbox
              id="urgentFirst"
              checked={urgentFirst}
              onCheckedChange={(checked) => setUrgentFirst(checked === true)}
            />
            <label htmlFor="urgentFirst" className="cursor-pointer select-none">
              Urgent first
            </label>
          </div>
          <Select
            value={sortMode}
            onValueChange={(value) => setSortMode(value as SortMode)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort queues" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manual">Manual order</SelectItem>
              <SelectItem value="clinic">Clinic name</SelectItem>
              <SelectItem value="customer">Customer name</SelectItem>
              <SelectItem value="loket">Loket number</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={resetQueues}>
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Reset order
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map(({ status, count, urgent }) => (
          <Card key={status} className="bg-card/70">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <StatusIcon status={status} />
                {statusCopy[status].label}
              </div>
              <div className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                {count} total • {urgent} urgent
              </div>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-muted-foreground">
              {statusCopy[status].hint}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {statusOrder.map((status) => (
          <Card
            key={status}
            className={cn(
              "flex h-full flex-col border-dashed",
              statusTone[status],
              dropTarget === status && "ring-2 ring-primary/40"
            )}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  <StatusIcon status={status} />
                  {statusCopy[status].label}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ListFilter className="h-4 w-4" />
                  Drag to reorder or drop to move status
                </div>
              </div>
              <CardDescription>{statusCopy[status].hint}</CardDescription>
            </CardHeader>
            <CardContent
              className="flex flex-1 flex-col gap-3 pb-6"
              onDragOver={(event) => {
                event.preventDefault();
                setDropTarget(status);
              }}
              onDrop={(event) => handleDrop(event, status)}
            >
              {displayedQueues[status].length === 0 ? (
                <EmptyState status={status} />
              ) : (
                displayedQueues[status].map((queue) => (
                  <QueueCard
                    key={queue.id}
                    queue={queue}
                    draggingId={draggingId}
                    onDragStart={(event) => {
                      event.dataTransfer.setData("text/plain", queue.id);
                      setDraggingId(queue.id);
                    }}
                    onDragEnd={() => {
                      setDraggingId(null);
                      setDropTarget(null);
                    }}
                    onDrop={(event) => handleDrop(event, status, queue.id)}
                    onStatusChange={handleStatusSelect}
                  />
                ))
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function StatusIcon({ status }: { status: QueueStatus }) {
  if (status === "waiting") return <WaitingIcon />;
  if (status === "call") return <CallIcon />;
  return <DoneIcon />;
}

function EmptyState({ status }: { status: QueueStatus }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-border/70 bg-background/80 p-6 text-center text-sm text-muted-foreground">
      <Waves className="mb-3 h-8 w-8 text-primary" />
      <p className="font-medium">Drop a queue to {statusCopy[status].label}</p>
      <p className="text-xs text-muted-foreground">
        Drag cards from other columns or add new arrivals later.
      </p>
    </div>
  );
}

function QueueCard({
  queue,
  onDragStart,
  onDragEnd,
  onDrop,
  draggingId,
  onStatusChange,
}: {
  queue: QueueItem;
  onDragStart: (event: DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  draggingId: string | null;
  onStatusChange: (queueId: string, status: QueueStatus) => void;
}) {
  const isDragging = draggingId === queue.id;

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      onDragOver={(event) => event.preventDefault()}
      className={cn(
        "group rounded-xl border border-border/80 bg-card p-4 shadow-sm transition-all",
        "hover:-translate-y-0.5 hover:shadow-md",
        isDragging && "ring-2 ring-primary/50"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">
              {queue.id}
            </span>
            <span
              className={cn(
                "rounded-full border px-2 py-0.5 text-xs font-medium",
                priorityTone[queue.priority]
              )}
            >
              {queue.priority === "urgent"
                ? "Urgent"
                : queue.priority === "vip"
                  ? "VIP"
                  : "Regular"}
            </span>
          </div>
          <p className="text-base font-semibold leading-tight">{queue.customer}</p>
          <p className="text-sm text-muted-foreground">{queue.clinicName}</p>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          <div className="flex items-center justify-end gap-1">
            <Clock3 className="h-4 w-4" />
            Loket {queue.loketNumber}
          </div>
          <div className="mt-2">
            <Select
              value={queue.status}
              onValueChange={(value) =>
                onStatusChange(queue.id, value as QueueStatus)
              }
            >
              <SelectTrigger className="w-[120px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="waiting">Waiting</SelectItem>
                <SelectItem value="call">Call</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-muted px-2 py-1">
            <ListFilter className="h-3 w-3" />
            Drag to sort
          </div>
          <div className="flex items-center gap-1 rounded-full bg-muted px-2 py-1">
            <ArrowUpDown className="h-3 w-3" />
            Drop to move
          </div>
        </div>
        <div className="flex items-center gap-1 font-medium text-primary">
          <PhoneCall className="h-3 w-3" />
          {statusCopy[queue.status].label}
        </div>
      </div>
    </div>
  );
}
