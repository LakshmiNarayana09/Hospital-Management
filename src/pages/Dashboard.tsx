
import { useEffect, useMemo, useState } from "react";
import {
  Users,
  Stethoscope,
  CalendarDays,
  Clock3,
} from "lucide-react";

import usePatients from "../hooks/usePatients";

import { getDoctors } from "../apis/doctorApi";
import { getAppointments } from "../apis/appointmentApi";

import type { Doctor } from "../types/Doctor";
import type { Appointment } from "../types/Appointment";

import StatCard from "../components/dashboard/StatCard";
import RecentPatients from "../components/dashboard/RecentPatients";

function Dashboard() {
  const {
    patients,
    loading: patientsLoading,
    error: patientsError,
  } = usePatients();

  const [doctors, setDoctors] =
    useState<Doctor[]>([]);

  const [appointments, setAppointments] =
    useState<Appointment[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [
          doctorData,
          appointmentData,
        ] = await Promise.all([
          getDoctors(),
          getAppointments(),
        ]);

        setDoctors(doctorData);
        setAppointments(appointmentData);
      } catch (error) {
        console.error(error);

        setError(
          "Failed to load dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const recentPatients = useMemo(() => {
    return [...patients]
      .sort(
        (a, b) =>
          new Date(
            b.registeredDate
          ).getTime() -
          new Date(
            a.registeredDate
          ).getTime()
      )
      .slice(0, 5);
  }, [patients]);

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const todaysAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) =>
        appointment.date === today
    );
  }, [appointments, today]);

  const pendingAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) =>
        appointment.status === "Scheduled"
    );
  }, [appointments]);

  if (patientsLoading || loading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (patientsError || error) {
    return (
      <div className="rounded-xl bg-red-50 p-4 text-red-600">
        {patientsError || error}
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Overview of hospital activities
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        <StatCard
          title="Total Patients"
          value={patients.length}
          icon={Users}
          description="Registered patients"
        />

        <StatCard
          title="Total Doctors"
          value={doctors.length}
          icon={Stethoscope}
          description="Registered doctors"
        />

        <StatCard
          title="Today's Appointments"
          value={todaysAppointments.length}
          icon={CalendarDays}
          description="Appointments scheduled today"
        />

        <StatCard
          title="Pending Appointments"
          value={pendingAppointments.length}
          icon={Clock3}
          description="Appointments waiting"
        />

      </div>

      <RecentPatients
        patients={recentPatients}
      />

    </div>
  );
}

export default Dashboard;