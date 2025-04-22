"use client"

import { cn } from "@/lib/utils"
import { ArrowRight, Briefcase, MapPin, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Job } from "../../lib/data"
import { formatDate, extractWorkType, getValidLogoUrl } from "../../lib/data"
import { Button } from "@/components/ui/button"
import { useApplications } from "@/context/applications-context"

interface JobListProps {
  jobs?: Job[]
  className?: string
}

export default function JobList({ jobs = [], className }: JobListProps) {
  const { addJob, isJobApplied } = useApplications();

  return (
    <div
      className={cn(
        "w-full max-w-xl mx-auto",
        "bg-white dark:bg-zinc-900/70",
        "border border-zinc-100 dark:border-zinc-800",
        "rounded-xl shadow-sm backdrop-blur-xl",
        className,
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Available Positions
            <span className="text-xs font-normal text-zinc-600 dark:text-zinc-400 ml-1">({jobs.length} jobs)</span>
          </h2>
          <span className="text-xs text-zinc-600 dark:text-zinc-400">Machine Learning</span>
        </div>

        <div className="space-y-2">
          {jobs.map((job) => (
            <div
              key={job.Detail_URL || `job-${Math.random()}`}
              className={cn(
                "group flex flex-col",
                "p-3 rounded-lg",
                "border border-zinc-100 dark:border-zinc-800",
                "hover:border-zinc-200 dark:hover:border-zinc-700",
                "hover:bg-zinc-50 dark:hover:bg-zinc-800/50",
                "transition-all duration-200",
              )}
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0">
                  <Image
                    src={getValidLogoUrl(job.Company_Logo) || "/placeholder.svg"}
                    alt={job.Company_Name || "Company"}
                    width={40}
                    height={40}
                    className="rounded-md border border-zinc-200 dark:border-zinc-700 object-contain bg-white"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 line-clamp-1 flex-1">
                      {job.Title || "Job Title"}
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs px-2 py-1 h-auto"
                      onClick={() => addJob(job)}
                      disabled={isJobApplied(job.Detail_URL)}
                    >
                      {isJobApplied(job.Detail_URL) ? "Added" : "Add"}
                    </Button>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2 line-clamp-1">
                    {job.Company_Name || "Company"}
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      <MapPin className="w-3 h-3" />
                      {job.Location ? job.Location.split(",")[0] : "Location not specified"}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      <Briefcase className="w-3 h-3" />
                      {extractWorkType(job.Primary_Description)}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      <Clock className="w-3 h-3" />
                      {formatDate(job.Created_At || "")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
        <Link
          href="#"
          className={cn(
            "w-full flex items-center justify-center gap-2",
            "py-2 px-3 rounded-lg",
            "text-xs font-medium",
            "bg-gradient-to-r from-zinc-900 to-zinc-800",
            "dark:from-zinc-50 dark:to-zinc-200",
            "text-zinc-50 dark:text-zinc-900",
            "hover:from-zinc-800 hover:to-zinc-700",
            "dark:hover:from-zinc-200 dark:hover:to-zinc-300",
            "shadow-sm hover:shadow",
            "transform transition-all duration-200",
            "hover:-translate-y-0.5",
            "active:translate-y-0",
            "focus:outline-none focus:ring-2",
            "focus:ring-zinc-500 dark:focus:ring-zinc-400",
            "focus:ring-offset-2 dark:focus:ring-offset-zinc-900",
          )}
        >
          <span>View All Jobs</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
