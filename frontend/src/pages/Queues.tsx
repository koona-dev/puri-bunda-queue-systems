import { useState, useMemo } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { QueueCard } from "@/components/QueueCard";
import { Button } from "@/components/ui/button";
import { QueueWithDetails, QueueStatus, Priority } from "@/types/queue.types";
import { Filter } from "lucide-react";

// Mock data for demonstration purposes
const mockQueues: QueueWithDetails[] = [
  {
    id: "1",
    queueNumber: "A001",
    patientId: "p1",
    clinicId: "c1",
    doctorId: "d1",
    staffId: "s1",
    queueType: "Reservasi" as any,
    priority: Priority.Urgent,
    serviceType: "Rawat Jalan" as any,
    referenceType: "Konsultasi" as any,
    chiefComplaint: "Demam tinggi",
    symptoms: "Demam, batuk",
    symptomsStartDate: new Date(),
    reservationDate: new Date(),
    preferredTime: "09:00",
    status: QueueStatus.Waiting,
    patient: {
      id: "p1",
      name: "Budi Santoso",
      phone: "081234567890",
    },
    clinic: {
      id: "c1",
      name: "Klinik Umum",
      code: "KU01",
    },
    doctor: {
      id: "d1",
      name: "Ahmad Wijaya",
      specialization: "Umum",
    },
    staff: {
      id: "s1",
      name: "Siti Nurhaliza",
      loketNumber: "Loket 1",
    },
  },
  {
    id: "2",
    queueNumber: "A002",
    patientId: "p2",
    clinicId: "c2",
    doctorId: "d2",
    staffId: "s2",
    queueType: "Walk-In" as any,
    priority: Priority.Normal,
    serviceType: "Rawat Jalan" as any,
    referenceType: "Checkup" as any,
    chiefComplaint: "Kontrol rutin",
    symptoms: "Tidak ada",
    symptomsStartDate: new Date(),
    reservationDate: new Date(),
    preferredTime: "10:00",
    status: QueueStatus.Waiting,
    patient: {
      id: "p2",
      name: "Ani Rahayu",
      phone: "082345678901",
    },
    clinic: {
      id: "c2",
      name: "Klinik Gigi",
      code: "KG01",
    },
    doctor: {
      id: "d2",
      name: "Siti Aminah",
      specialization: "Gigi",
    },
    staff: {
      id: "s2",
      name: "Rina Wati",
      loketNumber: "Loket 2",
    },
  },
  {
    id: "3",
    queueNumber: "A003",
    patientId: "p3",
    clinicId: "c1",
    doctorId: "d1",
    staffId: "s1",
    queueType: "Reservasi" as any,
    priority: Priority.Emergency,
    serviceType: "UGD" as any,
    referenceType: "Konsultasi" as any,
    chiefComplaint: "Kecelakaan",
    symptoms: "Luka terbuka",
    symptomsStartDate: new Date(),
    reservationDate: new Date(),
    preferredTime: "08:00",
    status: QueueStatus.Called,
    patient: {
      id: "p3",
      name: "Cahyo Prasetyo",
      phone: "083456789012",
    },
    clinic: {
      id: "c1",
      name: "Klinik Umum",
      code: "KU01",
    },
    doctor: {
      id: "d1",
      name: "Ahmad Wijaya",
      specialization: "Umum",
    },
    staff: {
      id: "s1",
      name: "Siti Nurhaliza",
      loketNumber: "Loket 1",
    },
  },
  {
    id: "4",
    queueNumber: "A004",
    patientId: "p4",
    clinicId: "c3",
    doctorId: "d3",
    staffId: "s3",
    queueType: "Walk-In" as any,
    priority: Priority.Normal,
    serviceType: "Rawat Jalan" as any,
    referenceType: "Lab" as any,
    chiefComplaint: "Cek lab",
    symptoms: "Tidak ada",
    symptomsStartDate: new Date(),
    reservationDate: new Date(),
    preferredTime: "11:00",
    status: QueueStatus.Done,
    patient: {
      id: "p4",
      name: "Dewi Lestari",
      phone: "084567890123",
    },
    clinic: {
      id: "c3",
      name: "Klinik Anak",
      code: "KA01",
    },
    doctor: {
      id: "d3",
      name: "Rini Susanti",
      specialization: "Anak",
    },
    staff: {
      id: "s3",
      name: "Linda Kusuma",
      loketNumber: "Loket 3",
    },
  },
];

interface SortableQueueCardProps {
  queue: QueueWithDetails;
  onStatusChange: (queueId: string, status: QueueStatus) => void;
}

function SortableQueueCard({ queue, onStatusChange }: SortableQueueCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: queue.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <QueueCard
        queue={queue}
        onStatusChange={onStatusChange}
        isDragging={isDragging}
      />
    </div>
  );
}

export default function Queues() {
  const [queues, setQueues] = useState<QueueWithDetails[]>(mockQueues);
  const [activeTab, setActiveTab] = useState<QueueStatus | "all">("all");
  const [showUrgentFirst, setShowUrgentFirst] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setQueues((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleStatusChange = (queueId: string, newStatus: QueueStatus) => {
    setQueues((prevQueues) =>
      prevQueues.map((queue) =>
        queue.id === queueId ? { ...queue, status: newStatus } : queue
      )
    );
  };

  const filteredAndSortedQueues = useMemo(() => {
    let filtered = queues;

    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter((queue) => queue.status === activeTab);
    }

    // Sort by priority if showUrgentFirst is enabled
    if (showUrgentFirst) {
      const priorityOrder = {
        [Priority.Emergency]: 0,
        [Priority.Urgent]: 1,
        [Priority.Normal]: 2,
      };

      filtered = [...filtered].sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );
    }

    return filtered;
  }, [queues, activeTab, showUrgentFirst]);

  const tabs = [
    { label: "All", value: "all" as const },
    { label: "Waiting", value: QueueStatus.Waiting },
    { label: "Called", value: QueueStatus.Called },
    { label: "Done", value: QueueStatus.Done },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Clinics Queue</h1>
        <Button
          variant={showUrgentFirst ? "default" : "outline"}
          onClick={() => setShowUrgentFirst(!showUrgentFirst)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          {showUrgentFirst ? "Urgent First: ON" : "Urgent First: OFF"}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === tab.value
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">
              {tab.value === "all"
                ? queues.length
                : queues.filter((q) => q.status === tab.value).length}
            </span>
          </button>
        ))}
      </div>

      {/* Queue Cards with Drag and Drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredAndSortedQueues.map((q) => q.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid gap-4">
            {filteredAndSortedQueues.length > 0 ? (
              filteredAndSortedQueues.map((queue) => (
                <SortableQueueCard
                  key={queue.id}
                  queue={queue}
                  onStatusChange={handleStatusChange}
                />
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No queues found for this filter
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
