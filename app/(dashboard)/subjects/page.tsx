"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Trash2, BookOpen, RefreshCw, Loader2 } from "lucide-react";

interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  credits: number;
  schoolId: string;
  createdAt: string;
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  // Sync core directory records from the network pipeline
  const fetchSubjects = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const token = typeof window !== "undefined" ? localStorage.getItem("sims_jwt_token") : null;
      const response = await fetch("http://localhost:5000/api/v1/subjects", {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      setSubjects(Array.isArray(data) ? data : data.data || []);
    } catch (err: any) {
      setError(err.message || "Could not successfully stream active records from database context.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  // Execute safe record purge mapped by subject unique identifier
  const handlePurgeSubject = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to completely remove "${name}" from the active course system?`)) return;
    
    try {
      setIsDeletingId(id);
      const token = typeof window !== "undefined" ? localStorage.getItem("sims_jwt_token") : null;
      
      const response = await fetch(`http://localhost:5000/api/v1/subjects/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to parse deletion sequence.");
      }

      // Locally drop record out of current viewing arrays reactively
      setSubjects((prev) => prev.filter((subject) => subject.id !== id));
    } catch (err: any) {
      alert(`Purge failed: ${err.message}`);
    } finally {
      setIsDeletingId(null);
    }
  };

  // Perform reactive structural inline parsing for fast runtime query checks
  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Directory Title and Action Blocks */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Subject Curriculum</h2>
          <p className="text-xs text-muted-foreground font-medium mt-0.5">
            Synchronize, review, and organize core subject modules across the isolated multi-tenant parameters.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchSubjects} disabled={isLoading} className="h-9">
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
          <Button size="sm" className="w-full sm:w-auto shrink-0 shadow-sm h-9">
            <Plus className="mr-2 h-4 w-4" /> Provision New Subject
          </Button>
        </div>
      </div>

      {/* Control Filter Bars */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by subject title or catalog code..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-md bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
          />
        </div>
        <Button variant="outline" size="icon" className="shrink-0 h-9 w-9">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {error && (
        <div className="p-3 text-xs bg-rose-50 border border-rose-100 dark:bg-rose-950/20 dark:border-rose-900 rounded-md text-rose-600 dark:text-rose-400 font-semibold">
          ⚠️ Context Synchronization Error: {error}
        </div>
      )}

      {/* Layout Table Structure */}
      <div className="rounded-lg border bg-card overflow-x-auto shadow-sm">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-muted/60 border-b text-xs font-semibold text-muted-foreground select-none">
            <tr>
              <th className="h-10 px-4 align-middle w-40">Catalog Code</th>
              <th className="h-10 px-4 align-middle">Subject Specifications</th>
              <th className="h-10 px-4 align-middle w-32 text-center">Weight Units</th>
              <th className="h-10 px-4 align-middle w-20 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y text-xs font-medium">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="h-48 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-2 text-xs">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span>Polling database nodes...</span>
                  </div>
                </td>
              </tr>
            ) : filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject) => (
                <tr key={subject.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 align-middle font-mono font-bold text-slate-700 dark:text-zinc-300 tracking-wider">
                    {subject.code}
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-zinc-100">{subject.name}</p>
                        {subject.description && (
                          <p className="text-[10px] text-muted-foreground font-normal line-clamp-1 mt-0.5">
                            {subject.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle text-center font-semibold text-slate-700 dark:text-zinc-400">
                    {subject.credits} Credits
                  </td>
                  <td className="p-4 align-middle text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isDeletingId === subject.id}
                      onClick={() => handlePurgeSubject(subject.id, subject.name)}
                      className="h-7 w-7 text-muted-foreground hover:text-rose-600 dark:hover:text-rose-400"
                    >
                      {isDeletingId === subject.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="h-32 text-center text-muted-foreground text-xs bg-muted/10">
                  No registered active subjects match the specified search metrics.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}