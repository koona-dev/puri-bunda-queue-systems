import { useState, useCallback } from "react";
import { AlertTriangle, ListFilter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { QueueList } from "@/components/queues/QueueList";
import type { ClinicTab, QueueItem, QueueStatus } from "@/types/queue";

// ---------------------------------------------------------------------------
// Mock data – replace with real API calls when the backend is connected
// ---------------------------------------------------------------------------
const CLINICS: ClinicTab[] = [
  { id: "poli-umum", name: "Poli Umum" },
  { id: "poli-anak", name: "Poli Anak" },
  { id: "poli-kandungan", name: "Poli Kandungan" },
  { id: "ugd", name: "UGD" },
];

const INITIAL_QUEUES: Record<string, QueueItem[]> = {
  "poli-umum": [
    {
      id: "q1",
      queueNumber: "A001",
      patientName: "Budi Santoso",
      loketNumber: "1",
      clinicId: "poli-umum",
      clinicName: "Poli Umum",
      priority: "Normal",
      status: "Waiting",
    },
    {
      id: "q2",
      queueNumber: "A002",
      patientName: "Siti Rahayu",
      loketNumber: "1",
      clinicId: "poli-umum",
      clinicName: "Poli Umum",
      priority: "Urgent",
      status: "Waiting",
    },
    {
      id: "q3",
      queueNumber: "A003",
      patientName: "Ahmad Fauzi",
      loketNumber: "2",
      clinicId: "poli-umum",
      clinicName: "Poli Umum",
      priority: "Normal",
      status: "Called",
    },
    {
      id: "q4",
      queueNumber: "A004",
      patientName: "Dewi Lestari",
      loketNumber: "2",
      clinicId: "poli-umum",
      clinicName: "Poli Umum",
      priority: "Emergency",
      status: "Waiting",
    },
  ],
  "poli-anak": [
    {
      id: "q5",
      queueNumber: "B001",
      patientName: "Rizki Pratama",
      loketNumber: "3",
      clinicId: "poli-anak",
      clinicName: "Poli Anak",
      priority: "Normal",
      status: "Waiting",
    },
    {
      id: "q6",
      queueNumber: "B002",
      patientName: "Nurul Hidayah",
      loketNumber: "3",
      clinicId: "poli-anak",
      clinicName: "Poli Anak",
      priority: "Urgent",
      status: "Called",
    },
  ],
  "poli-kandungan": [
    {
      id: "q7",
      queueNumber: "C001",
      patientName: "Rina Wahyuni",
      loketNumber: "4",
      clinicId: "poli-kandungan",
      clinicName: "Poli Kandungan",
      priority: "Normal",
      status: "Waiting",
    },
  ],
  ugd: [
    {
      id: "q8",
      queueNumber: "D001",
      patientName: "Hendra Gunawan",
      loketNumber: "UGD",
      clinicId: "ugd",
      clinicName: "UGD",
      priority: "Emergency",
      status: "Called",
    },
    {
      id: "q9",
      queueNumber: "D002",
      patientName: "Maya Indah",
      loketNumber: "UGD",
      clinicId: "ugd",
      clinicName: "UGD",
      priority: "Normal",
      status: "Waiting",
    },
  ],
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function Queues() {
  const [queues, setQueues] = useState<Record<string, QueueItem[]>>(INITIAL_QUEUES);
  const [urgentOnly, setUrgentOnly] = useState(false);

  const handleQueuesChange = useCallback(
    (clinicId: string, updated: QueueItem[]) => {
      setQueues((prev) => ({ ...prev, [clinicId]: updated }));
    },
    []
  );

  const handleStatusChange = useCallback(
    (clinicId: string, queueId: string, newStatus: QueueStatus) => {
      setQueues((prev) => ({
        ...prev,
        [clinicId]: prev[clinicId].map((q) =>
          q.id === queueId ? { ...q, status: newStatus } : q
        ),
      }));
    },
    []
  );

  const urgentCount = Object.values(queues)
    .flat()
    .filter(
      (q) =>
        (q.priority === "Emergency" || q.priority === "Urgent") &&
        q.status !== "Done"
    ).length;

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Antrian Klinik</h1>
          <p className="text-sm text-muted-foreground">
            Kelola antrian pasien per klinik
          </p>
        </div>

        <Button
          variant={urgentOnly ? "default" : "outline"}
          size="sm"
          onClick={() => setUrgentOnly((v) => !v)}
          className="gap-2"
        >
          <AlertTriangle className="h-4 w-4" />
          {urgentOnly ? "Tampilkan Semua" : "Filter Prioritas"}
          {!urgentOnly && urgentCount > 0 && (
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
              {urgentCount}
            </span>
          )}
          {urgentOnly && (
            <ListFilter className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>

      {/* Clinic Tabs */}
      <Tabs defaultValue={CLINICS[0].id}>
        <TabsList className="flex h-auto flex-wrap gap-1">
          {CLINICS.map((clinic) => {
            const clinicQueues = queues[clinic.id] ?? [];
            const activeCount = clinicQueues.filter(
              (q) => q.status !== "Done"
            ).length;
            return (
              <TabsTrigger key={clinic.id} value={clinic.id} className="gap-1.5">
                {clinic.name}
                {activeCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                    {activeCount}
                  </span>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {CLINICS.map((clinic) => (
          <TabsContent key={clinic.id} value={clinic.id} className="mt-4">
            <QueueList
              queues={queues[clinic.id] ?? []}
              onQueuesChange={(updated) =>
                handleQueuesChange(clinic.id, updated)
              }
              onStatusChange={(queueId, newStatus) =>
                handleStatusChange(clinic.id, queueId, newStatus)
              }
              urgentOnly={urgentOnly}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
