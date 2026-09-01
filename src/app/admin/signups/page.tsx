import { AdminAuthPanel } from "@/components/admin/admin-auth-panel";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site";
import { getVerifiedAdminSession } from "@/lib/auth";
import { listSignups } from "@/lib/admin-service";
import { isFirebaseClientConfigured } from "@/lib/public-env";
import { isFirebaseAdminConfigured, serverEnv } from "@/lib/server-env";

export default async function AdminSignupsPage() {
  const fullyConfigured =
    isFirebaseAdminConfigured() &&
    isFirebaseClientConfigured() &&
    serverEnv.adminEmails.length > 0;

  if (!fullyConfigured) {
    return (
      <main className="min-h-screen bg-synq-cream py-16">
        <Container>
          <AdminAuthPanel reason="setup" />
        </Container>
      </main>
    );
  }

  const user = await getVerifiedAdminSession(serverEnv.adminEmails).catch(
    () => null,
  );
  if (!user) {
    return (
      <main className="min-h-screen bg-synq-cream py-16">
        <Container>
          <AdminAuthPanel reason="auth" />
        </Container>
      </main>
    );
  }

  const result = await listSignups({});

  return (
    <main className="min-h-screen bg-synq-cream py-10">
      <Container>
        <AdminDashboard
          initialSignups={result.signups}
          total={result.total}
          user={user}
          useCases={[...siteContent.form.useCaseOptions]}
        />
      </Container>
    </main>
  );
}
