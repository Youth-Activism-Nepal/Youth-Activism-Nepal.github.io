"use client";

import React, { useEffect, useRef, useState } from "react";
import CardItem from "@/app/partners/card";
import { PartnerType } from "@/app/partners/partnerType";
import { getPartners } from "@/lib/apiClient";

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
        const partners = (await getPartners()) as PartnerType[];
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
