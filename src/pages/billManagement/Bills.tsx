
import { useMemo, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useBills from "../../hooks/useBills";
import usePatients from "../../hooks/usePatients";

import BillingTable from "../../components/bills/BillingTable";

import type { Bill } from "../../types/Billing";

function Billing() {
  const navigate = useNavigate();

  const {
    bills,
    loading,
    error,
    removeBill,
  } = useBills();

  const {
    patients,
    loading: patientsLoading,
    error: patientsError,
  } = usePatients();

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState<Bill["paymentStatus"] | "All">(
      "All"
    );

  const [sortBy, setSortBy] =
    useState<
      | "date"
      | "amount"
      | "patient"
    >("date");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 5;


  const getPatientName = (
    patientId: string
  ) => {
    const patient = patients.find(
      (patient) =>
        patient.id === patientId
    );

    return patient?.name || "";
  };


  const filteredBills = useMemo(() => {
    const result = bills.filter((bill) => {
      const patientName =
        getPatientName(
          bill.patientId
        );

      const searchText =
        search.toLowerCase().trim();

      const searchMatch =
        bill.billId
          .toLowerCase()
          .includes(searchText) ||
        patientName
          .toLowerCase()
          .includes(searchText);

      const statusMatch =
        status === "All" ||
        bill.paymentStatus === status;

      return (
        searchMatch && statusMatch
      );
    });

    return [...result].sort(
      (a, b) => {
        if (sortBy === "date") {
          return (
            new Date(b.billDate).getTime() -
            new Date(a.billDate).getTime()
          );
        }

        if (sortBy === "amount") {
          return (
            b.totalAmount -
            a.totalAmount
          );
        }

        if (sortBy === "patient") {
          return getPatientName(
            a.patientId
          ).localeCompare(
            getPatientName(
              b.patientId
            )
          );
        }

        return 0;
      }
    );
  }, [
    bills,
    patients,
    search,
    status,
    sortBy,
  ]);

  const totalPages = Math.ceil(
    filteredBills.length /
      itemsPerPage
  );

  const paginatedBills =
    filteredBills.slice(
      (currentPage - 1) *
        itemsPerPage,
      currentPage * itemsPerPage
    );

  const handleDelete = async (
    id: string
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this bill?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await removeBill(id);

      if (
        paginatedBills.length === 1 &&
        currentPage > 1
      ) {
        setCurrentPage(
          currentPage - 1
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete bill."
      );
    }
  };

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setSortBy("date");
    setCurrentPage(1);
  };


  if (
    loading ||
    patientsLoading
  ) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">
          Loading bills...
        </p>
      </div>
    );
  }


  if (error || patientsError) {
    return (
      <div className="rounded-xl bg-red-50 p-4 text-red-600">
        {error || patientsError}
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Billing Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage patient bills and payments
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/bills/add")
          }
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Bill
        </button>

      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(
                  e.target.value
                );
                setCurrentPage(1);
              }}
              placeholder="Search bill or patient..."
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-10 text-sm outline-none focus:border-blue-500"
            />

            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setCurrentPage(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={17} />
              </button>
            )}

          </div>

          <select
            value={status}
            onChange={(e) => {
              setStatus(
                e.target.value as
                  | Bill["paymentStatus"]
                  | "All"
              );

              setCurrentPage(1);
            }}
            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="All">
              All Payment Status
            </option>

            <option value="Paid">
              Paid
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Partially Paid">
              Partially Paid
            </option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(
                e.target.value as
                  | "date"
                  | "amount"
                  | "patient"
              );
            }}
            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="date">
              Sort by Date
            </option>

            <option value="amount">
              Sort by Amount
            </option>

            <option value="patient">
              Sort by Patient Name
            </option>
          </select>

        </div>

        {(search || status !== "All") && (
          <div className="mt-3">
            <button
              onClick={clearFilters}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>


      <div className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-medium text-gray-800">
          {filteredBills.length}
        </span>{" "}
        bill
        {filteredBills.length !== 1
          ? "s"
          : ""}
      </div>

      <BillingTable
        bills={paginatedBills}
        patients={patients}
        onView={(bill) =>
          navigate(
            `/bills/${bill.id}`
          )
        }
        onEdit={(bill) =>
          navigate(
            `/bills/${bill.id}/edit`
          )
        }
        onDelete={handleDelete}
      />

      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                (prev) => prev - 1
              )
            }
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              key={page}
              onClick={() =>
                setCurrentPage(page)
              }
              className={`rounded-lg px-3 py-2 text-sm ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage(
                (prev) => prev + 1
              )
            }
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
}

export default Billing;