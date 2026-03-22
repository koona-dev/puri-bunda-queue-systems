import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, RefreshCw } from "lucide-react";

import {
  type Clinic,
  type QueueItem,
  fetchClinics,
  fetchQueues,
} from "@/lib/clinics-queue";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const STATUS_OPTIONS = ["all", "Waiting", "Called", "Done", "Cancelled"] as const;
type StatusFilter = (typeof STATUS_OPTIONS)[number];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function getStatusStyles(status: string) {
  switch (status) {
    case "Waiting":
      return "bg-amber-100 text-amber-700";
    case "Called":
      return "bg-blue-100 text-blue-700";
    case "Done":
      return "bg-emerald-100 text-emerald-700";
    case "Cancelled":
      return "bg-rose-100 text-rose-700";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function SummaryCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string | number;
  description: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl">{value}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 text-sm text-muted-foreground">
        {description}
      </CardContent>
    </Card>
  );
}

export default function ClinicsQueue() {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [queues, setQueues] = useState<QueueItem[]>([]);
  const [selectedClinicId, setSelectedClinicId] = useState("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadQueueData() {
    setIsLoading(true);
    setError(null);

    try {
      const [clinicsResponse, queuesResponse] = await Promise.all([
        fetchClinics(),
        fetchQueues(),
      ]);

      setClinics(clinicsResponse);
      setQueues(queuesResponse);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Unable to load clinic queue data.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadQueueData();
  }, []);

  const selectedClinic = useMemo(
    () => clinics.find((clinic) => clinic.id === selectedClinicId),
    [clinics, selectedClinicId],
  );

  const filteredQueues = useMemo(() => {
    return queues.filter((item) => {
      const matchesClinic =
        selectedClinicId === "all" || item.clinic.id === selectedClinicId;
      const matchesStatus =
        statusFilter === "all" || item.queue.status === statusFilter;

      return matchesClinic && matchesStatus;
    });
  }, [queues, selectedClinicId, statusFilter]);

  const waitingCount = filteredQueues.filter(
    (item) => item.queue.status === "Waiting",
  ).length;
  const calledCount = filteredQueues.filter(
    (item) => item.queue.status === "Called",
  ).length;
  const completedCount = filteredQueues.filter(
    (item) => item.queue.status === "Done",
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">Clinics Queue</h1>
          <p className="text-sm text-muted-foreground">
            Monitor queue traffic by clinic, status, and patient handling flow.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => void loadQueueData()}
          disabled={isLoading}
        >
          <RefreshCw className={isLoading ? "animate-spin" : ""} />
          Refresh
        </Button>
      </div>

      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Unable to load clinic queue data</AlertTitle>
          <AlertDescription className="space-y-3">
            <p>{error}</p>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" onClick={() => void loadQueueData()}>
                Try again
              </Button>
              <Button asChild type="button">
                <Link to="/login">Open login page</Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      ) : null}

      {isLoading ? (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index}>
                <CardHeader className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-14" />
                </CardHeader>
                <CardContent className="pt-0">
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-12 w-full" />
              ))}
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              title="Visible clinics"
              value={selectedClinicId === "all" ? clinics.length : 1}
              description={
                selectedClinic
                  ? `${selectedClinic.name} is currently selected`
                  : "All clinics are included in the current view"
              }
            />
            <SummaryCard
              title="Visible queues"
              value={filteredQueues.length}
              description="Rows shown after applying the current filters."
            />
            <SummaryCard
              title="Waiting or called"
              value={waitingCount + calledCount}
              description="Queues that still need active handling from the clinic team."
            />
            <SummaryCard
              title="Completed"
              value={completedCount}
              description="Queues that have already been completed in the current filter."
            />
          </div>

          <Card>
            <CardHeader className="gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-1">
                <CardTitle>Filter clinic queues</CardTitle>
                <CardDescription>
                  Choose a clinic and queue status to narrow the monitoring table.
                </CardDescription>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Clinic</p>
                  <Select value={selectedClinicId} onValueChange={setSelectedClinicId}>
                    <SelectTrigger className="w-full sm:w-[240px]">
                      <SelectValue placeholder="Choose clinic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All clinics</SelectItem>
                      {clinics.map((clinic) => (
                        <SelectItem
                          key={clinic.id ?? clinic.code}
                          value={clinic.id ?? clinic.code}
                        >
                          {clinic.name}
                          {clinic.isActive ? "" : " (Inactive)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Queue status</p>
                  <Select
                    value={statusFilter}
                    onValueChange={(value) => setStatusFilter(value as StatusFilter)}
                  >
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue placeholder="Choose status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status === "all" ? "All statuses" : status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {selectedClinic ? (
                <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {selectedClinic.name}
                  </span>
                  {selectedClinic.description
                    ? ` — ${selectedClinic.description}`
                    : " — No clinic description has been added yet."}
                </div>
              ) : null}

              {filteredQueues.length === 0 ? (
                <Alert>
                  <AlertTitle>No queues found</AlertTitle>
                  <AlertDescription>
                    There are no queue records that match the selected clinic and
                    status filters yet.
                  </AlertDescription>
                </Alert>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Queue</TableHead>
                      <TableHead>Clinic</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Preferred time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQueues.map((item) => (
                      <TableRow key={item.queue.id ?? item.queue.queueNumber}>
                        <TableCell className="font-medium">
                          <div>{item.queue.queueNumber}</div>
                          <div className="text-xs text-muted-foreground">
                            {item.queue.priority}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>{item.clinic.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {item.clinic.code}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>{item.patient.name}</div>
                          <div className="text-xs text-muted-foreground">
                            NIK: {item.patient.nik}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>{item.doctor.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {item.doctor.specialization ?? "General clinic"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>{item.queue.serviceType}</div>
                          <div className="text-xs text-muted-foreground">
                            {formatDate(item.queue.reservationDate)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>{item.queue.preferredTime}</div>
                          <div className="text-xs text-muted-foreground">
                            Loket {item.staff.loketNumber}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyles(
                              item.queue.status,
                            )}`}
                          >
                            {item.queue.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
