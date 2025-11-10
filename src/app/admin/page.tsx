import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { connectToDatabase } from "@/lib/db";
import { Testimonial } from "@/models/Testimonial";
import { User } from "@/models/User";

export default async function AdminDashboard() {
  await connectToDatabase();
  
  const [
    totalTestimonials,
    pendingTestimonials,
    totalUsers,
    recentTestimonials
  ] = await Promise.all([
    Testimonial.countDocuments(),
    Testimonial.countDocuments({ verified: false }),
    User.countDocuments(),
    Testimonial.find().sort({ createdAt: -1 }).limit(5).lean()
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Testimonials</CardTitle>
            <CardDescription>All submitted testimonials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalTestimonials}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Review</CardTitle>
            <CardDescription>Testimonials awaiting approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{pendingTestimonials}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Testimonials</CardTitle>
          <CardDescription>Latest submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTestimonials.map((testimonial) => (
              <div key={testimonial._id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.location} • {new Date(testimonial.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-sm mt-1 line-clamp-2">{testimonial.text}</div>
                </div>
                <div className="flex items-center gap-2">
                  {testimonial.verified ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Verified
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

