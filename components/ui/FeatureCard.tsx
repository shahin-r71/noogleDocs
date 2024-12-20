import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-center mb-4">{icon}</div>
        <CardTitle className="text-xl font-semibold text-blue-700 text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-blue-600 text-center">{description}</p>
      </CardContent>
    </Card>
  );
}
