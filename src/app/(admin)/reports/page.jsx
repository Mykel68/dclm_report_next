"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/components/DataTable";

export default function Component() {
  const [formData, setFormData] = useState({
    date: "",
    serviceType: "",
    subService: "",
    subServiceDay: "",
    section: "",
    supervisor: "",
    personnelCount: "",
    volunteerCount: "",
    challenges: [" "],
    solution: "",
    equipmentDetails: "",
    remarks: "",
    location: "",
  });
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/report/`
        );
        if (response.status === 200 && Array.isArray(response.data)) {
          setReports(response.data.reverse());
        } else {
          console.error("Error fetching reports");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async () => {
    try {
      if (selectedReport) {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/report/` + selectedReport.id
        );
        setReports(reports.filter((report) => report.id !== selectedReport.id));
        setSelectedReport(null);
        setDeletePopupOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openDeletePopup = (report) => {
    setSelectedReport(report);
    setDeletePopupOpen(true);
  };

  const closeDeletePopup = () => {
    setSelectedReport(null);
    setDeletePopupOpen(false);
  };

  const handleEditReport = (report) => {
    setSelectedReport(report);
    setOpen(true);
  };

  const openViewPopup = (report) => {
    setSelectedReport(report);
    console.log(report);
    setView(true);
  };

  const handleSaveChanges = async () => {
    try {
      if (selectedReport) {
        // Update the report with the new data
        const updatedReport = {
          ...selectedReport,
          // Update the report data with the new values from the form
          serviceType: formData.serviceType,
          section: formData.section,
          supervisor: formData.supervisor,
          location: formData.location,
        };
        console.log(updatedReport);
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/report/` + selectedReport.id
        );
        if (response.status === 200) {
          // Update the reports state with the updated report
          setReports(
            reports.map((report) =>
              report.id === selectedReport.id ? updatedReport : report
            )
          );
          setSelectedReport(null);
          setOpen(false);
        } else {
          console.error("Error updating report");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Report</CardTitle>
          <CardDescription>Recent report from the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className=" sm:table-cell">Service</TableHead>
                <TableHead className=" sm:table-cell">Section</TableHead>
                <TableHead className=" md:table-cell">Supervisor</TableHead>
                <TableHead className=" md:table-cell">Location</TableHead>
                <TableHead className=" md:table-cell">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id} className=" hover:cursor-pointer">
                  <TableCell onClick={() => openViewPopup(report)}>
                    {report.date}
                  </TableCell>
                  <TableCell
                    className=" sm:table-cell"
                    onClick={() => openViewPopup(report)}
                  >
                    {report.serviceType}
                  </TableCell>
                  <TableCell
                    className=" sm:table-cell"
                    onClick={() => openViewPopup(report)}
                  >
                    {report.section}
                  </TableCell>
                  <TableCell
                    className=" md:table-cell"
                    onClick={() => openViewPopup(report)}
                  >
                    {report.supervisor}
                  </TableCell>
                  <TableCell
                    className=" md:table-cell"
                    onClick={() => openViewPopup(report)}
                  >
                    {report.location}
                  </TableCell>
                  <TableCell className=" md:table-cell">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => openViewPopup(report)}>
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditReport(report)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openDeletePopup(report)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Report Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {/* Trigger element is not needed here */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Report</DialogTitle>
            <DialogDescription>
              Make changes to your Report here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <ReportForm report={selectedReport} onSave={handleSaveChanges} />
        </DialogContent>
      </Dialog>

      {/* Show Report Dialog */}
      <Dialog open={view} onOpenChange={setView}>
        <DialogTrigger asChild>
          {/* Trigger element is not needed here */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] h-50 overflow-auto">
          <DialogHeader>
            <DialogTitle> Report Details</DialogTitle>
            <DialogDescription>More Information about Report</DialogDescription>
          </DialogHeader>
          <ReportTable report={selectedReport} />
        </DialogContent>
      </Dialog>

      {/* Delete Popup Dialog */}
      <Dialog open={deletePopupOpen} onOpenChange={setDeletePopupOpen}>
        <DialogTrigger asChild>
          {/* Trigger element is not needed here */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Report</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this report?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={closeDeletePopup}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
function ReportTable({ report }) {
  const [reportDetail, setReportDetail] = useState(report);
  const columns = [
    {
      accessorKey: "feilds",
      header: "Feilds",
    },
    {
      accessorKey: "results",
      header: "Results",
    },
  ];
  const data = [
    // {
    //   feilds: "Date",
    //   results: reportDetail.date,
    // },
    {
      feilds: "Section",
      results: reportDetail.section,
    },
    {
      feilds: " Type of Service",
      results: reportDetail.serviceType,
    },
    {
      feilds: " Type ",
      results: reportDetail.subService,
    },

    {
      feilds: " Service Day",
      results: reportDetail.subServiceDay,
    },
    {
      feilds: "Location",
      results: reportDetail.location,
    },
    {
      feilds: " Supervisor ",
      results: reportDetail.supervisor,
    },
    {
      feilds: "Number of Personnel ",
      results: reportDetail.personnelCount,
    },
    {
      feilds: "Number of Volunteer",
      results: reportDetail.volunteerCount,
    },
  ];
  return <DataTable columns={columns} data={data} className=" h-full" />;
}

function ReportForm({ report, onSave }) {
  const [selectedReport, setSelectedReport] = useState(null);

  const [formData, setFormData] = useState(
    report || {
      serviceType: "",
      section: "",
      supervisor: "",
      location: "",
    }
  );

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedReport) {
        const updatedReport = {
          ...selectedReport,
          serviceType: formData.serviceType,
          section: formData.section,
          supervisor: formData.supervisor,
          location: formData.location,
        };
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/report/${selectedReport.id}`,
          updatedReport
        );
        // if (response.status === 200) {
        //   setReports(
        //     reports.map((report) =>
        //       report.id === selectedReport.id ? updatedReport : report
        //     )
        //   );
        //   setSelectedReport(null);
        //   setOpen(false);
        // } else {
        //   console.error("Error updating report");
        // }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className={cn("grid items-start gap-4")} onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="serviceType">Service Type</Label>
        <Input
          type="text"
          id="serviceType"
          name="serviceType"
          value={formData.serviceType}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="section">Section</Label>
        <Input
          type="text"
          id="section"
          name="section"
          value={formData.section}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="supervisor">Supervisor</Label>
        <Input
          type="text"
          id="supervisor"
          name="supervisor"
          value={formData.supervisor}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="location">Location</Label>
        <Input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
}
