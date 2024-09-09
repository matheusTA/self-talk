import { Card, CardContent } from "@/components/ui/card";

interface MessageBalloonProps {
  owner: "user" | "bot";
}

export default function MessageBalloon({ owner }: MessageBalloonProps) {
  return (
    <Card
      data-owner={owner}
      className="max-w-xl data-[owner=bot]:mr-auto data-[owner=user]:ml-auto data-[owner=bot]:rounded-tl-none data-[owner=user]:rounded-tr-none"
    >
      <CardContent className="p-3">
        <p className="blur-[2px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s,
        </p>
      </CardContent>
    </Card>
  );
}
