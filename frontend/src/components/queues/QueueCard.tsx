import { GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { QueueItem, QueueStatus } from "@/types/queue";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface QueueCardProps {
  queue: QueueItem;
  onStatusChange: (id: string, status: QueueStatus) => void;
}

const STATUS_NEXT: Record<QueueStatus, QueueStatus | null> = {
  Waiting: "Called",
  Called: "Done",
  Done: null,
};

const STATUS_LABEL: Record<QueueStatus, string> = {
  Waiting: "Panggil",
  Called: "Selesai",
  Done: "Selesai",
};

const PRIORITY_VARIANT: Record<
  QueueItem["priority"],
  "destructive" | "warning" | "secondary"
> = {
  Emergency: "destructive",
  Urgent: "warning",
  Normal: "secondary",
};

const STATUS_BADGE_VARIANT: Record<QueueStatus, "info" | "warning" | "success"> = {
  Waiting: "info",
  Called: "warning",
  Done: "success",
};

const PRIORITY_NUMBER_COLOR: Record<QueueItem["priority"], string> = {
  Emergency: "bg-red-100 text-red-700",
  Urgent: "bg-amber-100 text-amber-700",
  Normal: "bg-muted text-muted-foreground",
};

export function QueueCard({ queue, onStatusChange }: QueueCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: queue.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const nextStatus = STATUS_NEXT[queue.status];

  return (
    <div ref={setNodeRef} style={style} className="mb-3">
      <Card
        className={cn(
          "select-none transition-shadow",
          isDragging && "opacity-50 shadow-xl ring-2 ring-primary",
          queue.priority === "Emergency" && "border-l-4 border-l-red-500",
          queue.priority === "Urgent" && "border-l-4 border-l-amber-400",
          queue.priority === "Normal" && "border-l-4 border-l-transparent"
        )}
      >
        <CardContent className="px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Drag handle */}
            <button
              className="cursor-grab touch-none text-muted-foreground/50 hover:text-muted-foreground active:cursor-grabbing shrink-0"
              {...attributes}
              {...listeners}
              aria-label="Drag to reorder"
            >
              <GripVertical className="h-4 w-4" />
            </button>

            {/* Queue number pill */}
            <div
              className={cn(
                "flex h-10 w-14 shrink-0 items-center justify-center rounded-lg text-sm font-bold",
                PRIORITY_NUMBER_COLOR[queue.priority]
              )}
            >
              {queue.queueNumber}
            </div>

            {/* Patient & clinic info */}
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-sm leading-tight">
                {queue.patientName}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {queue.clinicName} &middot; Loket {queue.loketNumber}
              </p>
            </div>

            {/* Badges */}
            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <Badge variant={PRIORITY_VARIANT[queue.priority]} className="text-[11px]">
                {queue.priority}
              </Badge>
              <Badge variant={STATUS_BADGE_VARIANT[queue.status]} className="text-[11px]">
                {queue.status}
              </Badge>
            </div>

            {/* Action button — spacer div preserves column width for Done cards */}
            <div className="shrink-0 pl-2">
              {nextStatus ? (
                <Button
                  size="sm"
                  variant={queue.status === "Called" ? "default" : "outline"}
                  className="w-24"
                  onClick={() => onStatusChange(queue.id, nextStatus)}
                >
                  {STATUS_LABEL[queue.status]}
                </Button>
              ) : (
                <div className="w-24" aria-hidden="true" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

