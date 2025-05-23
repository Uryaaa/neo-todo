import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileForm } from "@/components/profile/profile-form";
import { User, UserCog } from "lucide-react";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div className="neobrutal-filter-container mb-6">
        <div className="flex items-center">
          <User className="h-8 w-8 mr-3" />
          <h1 className="text-3xl font-black tracking-tight">Profile</h1>
        </div>
        <p className="text-black font-medium mt-2">
          Manage your personal information
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="neobrutal-card card-cyan animate-pop">
          <CardHeader className="border-b-2 border-black">
            <div className="flex items-center">
              <UserCog className="h-5 w-5 mr-2" />
              <CardTitle className="text-xl font-bold">Your Profile</CardTitle>
            </div>
            <CardDescription className="text-black font-medium">
              Manage your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 p-4 border-2 border-black bg-yellow-100 shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
              <Avatar className="h-24 w-24 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0)]">
                {dbUser.image ? (
                  <AvatarImage
                    src={`${dbUser.image}?v=${Date.now()}`}
                    alt={dbUser.name || "User"}
                  />
                ) : (
                  <AvatarFallback className="bg-pink-200 text-black font-bold text-2xl">
                    {dbUser.name
                      ? dbUser.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : dbUser.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <h2 className="text-xl font-bold border-b-2 border-black pb-1 inline-block">{dbUser.name || "User"}</h2>
                <p className="text-black font-medium">{dbUser.email}</p>
                <p className="text-sm font-medium text-black">
                  Member since {new Date(dbUser.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <ProfileForm user={dbUser} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
