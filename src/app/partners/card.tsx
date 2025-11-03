import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";
import { PartnerType } from "@/app/partners/partnerType";

export default function CardItem({ Partners }: { Partners: PartnerType[] }) {
  return (
    <div className="overflow-hidden mt-10 px-6">
      <h1 className="flex text-4xl text-center font-black items-center justify-center text-red-600">
        Our Partners
      </h1>

      <div className="flex justify-center mt-8 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
          {Partners?.map((partner) => {
            const card = (
              <Card
  key={partner.id}
  className="bg-offWhite w-[280px] h-[320px] rounded-lg
             flex flex-col items-center justify-between
             px-4 py-4 shrink-0 overflow-hidden
             cursor-pointer hover:shadow-xl transition-shadow"
>
  {/* Fixed image area */}
  <div className="w-full h-[200px] flex items-center justify-center">
    <div className="w-[200px] h-[200px] flex items-center justify-center p-4">
      <Image
        alt={`${partner.name} Image`}
        src={partner.image || "/images/YANLOGO.png"}
        className="object-contain w-full h-full rounded-md"
        loading="lazy"
      />
    </div>
  </div>

  {/* Fixed title area */}
  <CardHeader className="w-full mt-2 px-0">
    <h4 className="mx-auto text-center font-semibold uppercase text-primaryPurple
                   leading-tight line-clamp-2 h-[56px]">
      {partner.name}
    </h4>
  </CardHeader>
</Card>


            );

            return partner.link ? (
              <Link
                key={partner.id}
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"    // keep fixed box as a block element
              >
                {card}
              </Link>
            ) : (
              <div key={partner.id} className="block">
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
