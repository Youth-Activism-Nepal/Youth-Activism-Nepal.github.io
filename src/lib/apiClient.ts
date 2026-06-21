import { API_BASE_URL } from "@/config/api";

export type MainItem = {
    id?: string;
    mongoId?: string;
    order?: number;
    together?: string;
    heading?: string;
    subheading?: string;
    text?: string;
    image?: string;
    height?: number;
    height_vh?: number;
    isHtml?: boolean;
};

export type Project = {
    id?: string;
    slug?: string;
    mongoId?: string;
    image?: string;
    images?: string[] | string;
    badge?: string;
    name?: string;
    role?: string;
    heading?: string;
    subheading?: string;
    content?: string;
    hashtags?: string;
    title?: string;
    description?: string;
    url?: string;
    extra?: Record<string, unknown> | null;
};

export type TeamMember = {
    id?: string;
    mongoId?: string;
    image?: string;
    badge?: string;
    name: string;
    role: string;
    year: number;
    rank?: number;
};

export type Partner = {
    id?: string;
    mongoId?: string;
    image?: string;
    name: string;
    url?: string;
    link?: string;
    description?: string;
};

type Envelope<T> = {
    data?: T;
    project?: T;
};

function parseNumber(value: unknown): number | undefined {
    if (value === null || value === undefined || value === "") {
        return undefined;
    }

    const num = Number(value);
    return Number.isFinite(num) ? num : undefined;
}

function toSlug(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...init,
        headers: {
            Accept: "application/json",
            ...(init?.headers ?? {}),
        },
        cache: init?.cache ?? "no-store",
    });

    return response;
}

async function getJson<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await apiFetch(path, init);
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }
    return (await response.json()) as T;
}

function unwrapList<T>(value: T[] | Envelope<T[]>): T[] {
    if (Array.isArray(value)) {
        return value;
    }
    return Array.isArray(value?.data) ? value.data : [];
}

function unwrapItem<T>(value: T | Envelope<T>): T | null {
    if (value && typeof value === "object") {
        const envelope = value as Envelope<T>;
        if (envelope.project) return envelope.project;
        if (envelope.data) return envelope.data;
    }
    return (value as T) ?? null;
}

export function normalizeMainItem(doc: any): MainItem {
    return {
        ...doc,
        id: doc?.id,
        mongoId: doc?.mongo_id ?? doc?._id ?? doc?.id,
        order: parseNumber(doc?.order ?? doc?.Order ?? doc?.sort_order ?? doc?.sortOrder),
        height: parseNumber(doc?.height),
        height_vh: parseNumber(doc?.height_vh ?? doc?.heightVh),
        isHtml:
            typeof doc?.isHtml === "boolean"
                ? doc.isHtml
                : doc?.isHTML === true ||
                  doc?.isHTML === "true" ||
                  doc?.isHTML === 1,
    };
}

export function normalizeProject(doc: any, index = 0): Project {
    const fallbackName =
        typeof doc?.name === "string" && doc.name.trim()
            ? doc.name
            : `project-${index + 1}`;
    const slug = doc?.id || doc?.slug || toSlug(fallbackName);

    return {
        ...doc,
        id: slug,
        slug,
        mongoId: doc?.mongo_id ?? doc?._id,
        images: Array.isArray(doc?.images) || typeof doc?.images === "string"
            ? doc.images
            : undefined,
    };
}

export function normalizeTeamMember(doc: any): TeamMember {
    return {
        ...doc,
        id: doc?.id,
        mongoId: doc?.mongo_id ?? doc?._id ?? doc?.id,
        year: Number(doc?.year),
        rank: parseNumber(doc?.rank),
    };
}

export function normalizePartner(doc: any, index = 0): Partner {
    return {
        ...doc,
        id: doc?.id ?? doc?.mongo_id ?? doc?._id ?? `partner-${index + 1}`,
        mongoId: doc?.mongo_id ?? doc?._id ?? doc?.id,
        url: doc?.url ?? doc?.link,
        link: doc?.link ?? doc?.url,
    };
}

export async function getMainItems(): Promise<MainItem[]> {
    const json = await getJson<Envelope<any[]>>("/data/Main");
    return unwrapList(json).map(normalizeMainItem);
}

export async function getProjects(): Promise<Project[]> {
    const json = await getJson<Envelope<any[]>>("/data/Projects");
    return unwrapList(json).map((doc, index) => normalizeProject(doc, index));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    const response = await apiFetch(`/data/Projects/${encodeURIComponent(slug)}`);
    if (response.status === 404) {
        return null;
    }
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }
    const json = (await response.json()) as Envelope<any> | any;
    const project = unwrapItem(json);
    return project ? normalizeProject(project) : null;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
    const json = await getJson<Envelope<any[]>>("/data/Team");
    return unwrapList(json).map(normalizeTeamMember);
}

export async function getPartners(): Promise<Partner[]> {
    const json = await getJson<Envelope<any[]>>("/data/Partners");
    return unwrapList(json).map((doc, index) => normalizePartner(doc, index));
}
