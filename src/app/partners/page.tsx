"use client";

import React, { useEffect, useRef, useState } from "react";
import CardItem from "@/app/partners/card";
import { PartnerType } from "@/app/partners/partnerType";

export default function Partners() {
  const cacheRef = useRef<PartnerType[] | null>(null);
  const [partnerList, setPartnerList] = useState<PartnerType[]>([]);

  useEffect(() => {
    if (cacheRef.current) {
      setPartnerList(cacheRef.current);
      return;
    }

    async function fetchPartners() {
      try {
        const res = await fetch(
          "https://data.youthactivismnepal.org.np/data/Partners",
          { cache: "no-store" }
        );
        const json = await res.json();

        // Expecting json.data to be an array compatible with PartnerType
        const partners: PartnerType[] = Array.isArray(json?.data)
          ? json.data
          : [];

        cacheRef.current = partners;
        setPartnerList(partners);
      } catch (error) {
        console.error("Failed to fetch partners:", error);
      }
    }

    fetchPartners();
  }, []);

  return (
    <div className="bg-offWhite min-h-[75vh] px-4">
      <CardItem Partners={partnerList} />
    </div>
  );
}
