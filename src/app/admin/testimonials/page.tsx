"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/Badge";
import { TestimonialCard } from "@/components/TestimonialCard";

type Testimonial = {
  _id: string;
  name: string;
  location?: string;
  text: string;
  verified: boolean;
  createdAt: string;
  imageUrl?: string;
  videoUrl?: string;
  isVideo?: boolean;
  ratingsSum?: number;
  ratingsCount?: number;
};

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "verified">("all");

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/admin/testimonials");
      const data = await response.json();
      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verified: true }),
      });

      if (response.ok) {
        setTestimonials(prev =>
          prev.map(t => t._id === id ? { ...t, verified: true } : t)
        );
      }
    } catch (error) {
      console.error("Error approving testimonial:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTestimonials(prev => prev.filter(t => t._id !== id));
      }
    } catch (error) {
      console.error("Error rejecting testimonial:", error);
    }
  };

  const filteredTestimonials = testimonials.filter(testimonial => {
    if (filter === "pending") return !testimonial.verified;
    if (filter === "verified") return testimonial.verified;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Manage Testimonials</h1>
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All ({testimonials.length})
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            onClick={() => setFilter("pending")}
          >
            Pending ({testimonials.filter(t => !t.verified).length})
          </Button>
          <Button
            variant={filter === "verified" ? "default" : "outline"}
            onClick={() => setFilter("verified")}
          >
            Verified ({testimonials.filter(t => t.verified).length})
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredTestimonials.map((testimonial) => (
          <Card key={testimonial._id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>
                    {testimonial.location} • {new Date(testimonial.createdAt).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {testimonial.verified ? (
                    <Badge color="green">Verified</Badge>
                  ) : (
                    <Badge color="red">Pending</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <TestimonialCard
                  t={{
                    id: testimonial._id,
                    name: testimonial.name,
                    location: testimonial.location,
                    text: testimonial.text,
                    verified: testimonial.verified,
                    imageUrl: testimonial.imageUrl,
                    videoUrl: testimonial.videoUrl,
                    isVideo: testimonial.isVideo,
                    ratingsSum: testimonial.ratingsSum,
                    ratingsCount: testimonial.ratingsCount,
                  }}
                />
              </div>
              {!testimonial.verified && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleApprove(testimonial._id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleReject(testimonial._id)}
                  >
                    Reject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTestimonials.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No testimonials found.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

