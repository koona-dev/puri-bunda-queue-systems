import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { QueueCard } from "./QueueCard";
import type { QueueItem, QueueStatus } from "@/types/queue";
import { AlertTriangle } from "lucide-react";

interface QueueListProps {
  queues: QueueItem[];
  onQueuesChange: (queues: QueueItem[]) => void;
  onStatusChange: (id: string, status: QueueStatus) => void;
  urgentOnly: boolean;
}

export function QueueList({
  queues,
  onQueuesChange,
  onStatusChange,
  urgentOnly,
}: QueueListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = queues.findIndex((q) => q.id === active.id);
      const newIndex = queues.findIndex((q) => q.id === over.id);
      onQueuesChange(arrayMove(queues, oldIndex, newIndex));
    }
  }

  // Separate urgent/emergency from normal for display
  const urgent = queues.filter(
    (q) => q.priority === "Emergency" || q.priority === "Urgent"
  );
  const normal = queues.filter((q) => q.priority === "Normal");

  const displayQueues = urgentOnly ? urgent : queues;

  if (displayQueues.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Tidak ada antrian.
      </p>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={displayQueues.map((q) => q.id)}
        strategy={verticalListSortingStrategy}
      >
        {/* Urgent section pinned at top when not filtering */}
        {!urgentOnly && urgent.length > 0 && (
          <div className="mb-4">
            <div className="mb-2 flex items-center gap-1.5 text-sm font-medium text-amber-700">
              <AlertTriangle className="h-4 w-4" />
              Prioritas Tinggi ({urgent.length})
            </div>
            {urgent.map((queue) => (
              <QueueCard
                key={queue.id}
                queue={queue}
                onStatusChange={onStatusChange}
              />
            ))}
          </div>
        )}

        {/* Normal queues (or all when filtering) */}
        {urgentOnly
          ? urgent.map((queue) => (
              <QueueCard
                key={queue.id}
                queue={queue}
                onStatusChange={onStatusChange}
              />
            ))
          : normal.map((queue) => (
              <QueueCard
                key={queue.id}
                queue={queue}
                onStatusChange={onStatusChange}
              />
            ))}
      </SortableContext>
    </DndContext>
  );
}
