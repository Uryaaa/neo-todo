import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SettingsForm } from "@/components/settings/settings-form";
import { Settings, Sliders } from "lucide-react";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const settings = await prisma.settings.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!settings) {
    // Create default settings if they don't exist
    await prisma.settings.create({
      data: {
        userId: user.id,
        accentColor: "pink",
        emailNotifications: true,
      },
    });
  }

  const userSettings = settings || {
    id: "",
    userId: user.id,
    accentColor: "pink",
    emailNotifications: true,
  };

  return (
    <div className="space-y-6">
      <div className="neobrutal-filter-container mb-6">
        <div className="flex items-center">
          <Settings className="h-8 w-8 mr-3" />
          <h1 className="text-3xl font-black tracking-tight">Settings</h1>
        </div>
        <p className="text-black font-medium mt-2">
          Customize your application preferences
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="neobrutal-card card-purple animate-pop">
          <CardHeader className="border-b-2 border-black">
            <div className="flex items-center">
              <Sliders className="h-5 w-5 mr-2" />
              <CardTitle className="text-xl font-bold">Application Settings</CardTitle>
            </div>
            <CardDescription className="text-black font-medium">
              Manage your application preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <SettingsForm settings={userSettings} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
