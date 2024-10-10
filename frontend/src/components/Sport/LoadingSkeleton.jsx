import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

function LoadingSkeleton() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <Skeleton className="h-8 w-3/4 mx-auto" />
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full h-[50vh] mb-6" />
        <Skeleton className="h-4 w-1/2 mb-6" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}

export default LoadingSkeleton;
