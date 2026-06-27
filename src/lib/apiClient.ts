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
    youtubeLink?: string;
    googleFormUrl?: string;
    startDate?: string;
    endDate?: string;
    isActive?: boolean;
    phase?: "upcoming" | "active" | "past";
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

export type Blog = {
    id?: string;
    slug?: string;
    mongoId?: string;
    image?: string;
    images?: string[] | string;
    youtubeLink?: string;
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

export type Testimonial = {
    id?: string;
    mongoId?: string;
    name: string;
    image?: string;
    social_url?: string;
    involvement?: string;
    testimonial: string;
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

function parseBoolean(value: unknown): boolean | undefined {
    if (value === null || value === undefined || value === "") {
        return undefined;
    }

    if (typeof value === "boolean") {
        return value;
    }

    if (typeof value === "number") {
        return value !== 0;
    }

    if (typeof value === "string") {
        const normalized = value.trim().toLowerCase();
        if (["true", "yes", "1", "active"].includes(normalized)) {
            return true;
        }
        if (["false", "no", "0", "inactive"].includes(normalized)) {
            return false;
        }
    }

    return undefined;
}

function parseDateString(value: unknown): string | undefined {
    if (typeof value !== "string") {
        return undefined;
    }

    const trimmed = value.trim();
    if (!trimmed) {
        return undefined;
    }

    const parsed = new Date(trimmed);
    return Number.isNaN(parsed.getTime()) ? undefined : trimmed;
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

    const startDate = parseDateString(doc?.startDate);
    const endDate = parseDateString(doc?.endDate);

    return {
        ...doc,
        id: slug,
        slug,
        mongoId: doc?.mongo_id ?? doc?._id,
        youtubeLink: doc?.youtubeLink,
        googleFormUrl: doc?.googleFormUrl,
        startDate,
        endDate,
        isActive: parseBoolean(doc?.isActive),
        phase: getProjectPhase(
            {
                startDate,
                endDate,
                isActive: parseBoolean(doc?.isActive),
            },
            new Date()
        ),
        images: Array.isArray(doc?.images) || typeof doc?.images === "string"
            ? doc.images
            : undefined,
    };
}

export function getProjectPhase(
    project: Pick<Project, "startDate" | "endDate" | "isActive">,
    now = new Date()
): "upcoming" | "active" | "past" {
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const start = project.startDate ? new Date(project.startDate) : null;
    const end = project.endDate ? new Date(project.endDate) : null;

    if (start && !Number.isNaN(start.getTime())) {
        start.setHours(0, 0, 0, 0);
    }
    if (end && !Number.isNaN(end.getTime())) {
        end.setHours(23, 59, 59, 999);
    }

    if (start && start > today) {
        return "upcoming";
    }

    if (end && end < today) {
        return "past";
    }

    if (start || end) {
        return "active";
    }

    return project.isActive ? "active" : "past";
}

function getProjectSortTime(project: Project, phase: "upcoming" | "active" | "past"): number {
    if (phase === "upcoming") {
        return project.startDate ? new Date(project.startDate).getTime() : Number.MAX_SAFE_INTEGER;
    }

    if (phase === "active") {
        if (project.endDate) return new Date(project.endDate).getTime();
        if (project.startDate) return new Date(project.startDate).getTime();
        return Number.MAX_SAFE_INTEGER;
    }

    if (project.endDate) return new Date(project.endDate).getTime() * -1;
    if (project.startDate) return new Date(project.startDate).getTime() * -1;
    return 0;
}

export function filterProjectsByPhase(
    projects: Project[],
    phase: "upcoming" | "active" | "past"
): Project[] {
    return projects
        .filter((project) => getProjectPhase(project) === phase)
        .sort((a, b) => getProjectSortTime(a, phase) - getProjectSortTime(b, phase));
}

export function normalizeBlog(doc: any, index = 0): Blog {
    const fallbackName =
        typeof doc?.name === "string" && doc.name.trim()
            ? doc.name
            : `blog-${index + 1}`;
    const slug = doc?.id || doc?.slug || toSlug(fallbackName);

    return {
        ...doc,
        id: slug,
        slug,
        mongoId: doc?.mongo_id ?? doc?._id,
        youtubeLink: doc?.youtubeLink,
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

export function normalizeTestimonial(doc: any): Testimonial {
    return {
        ...doc,
        id: doc?.id ?? doc?.mongo_id ?? doc?._id,
        mongoId: doc?.mongo_id ?? doc?._id ?? doc?.id,
        name: String(doc?.name ?? ""),
        image: typeof doc?.image === "string" ? doc.image : undefined,
        social_url:
            typeof doc?.social_url === "string" ? doc.social_url : undefined,
        involvement:
            typeof doc?.involvement === "string" ? doc.involvement : undefined,
        testimonial: String(doc?.testimonial ?? ""),
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

export async function getBlogs(): Promise<Blog[]> {
    const json = await getJson<Envelope<any[]>>("/data/Blogs");
    return unwrapList(json).map((doc, index) => normalizeBlog(doc, index));
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
    const response = await apiFetch(`/data/Blogs/${encodeURIComponent(slug)}`);
    if (response.status === 404) {
        return null;
    }
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }
    const json = (await response.json()) as Envelope<any> | any;
    const blog = unwrapItem(json);
    return blog ? normalizeBlog(blog) : null;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
    const json = await getJson<Envelope<any[]>>("/data/Team");
    return unwrapList(json).map(normalizeTeamMember);
}

export async function getPartners(): Promise<Partner[]> {
    const json = await getJson<Envelope<any[]>>("/data/Partners");
    return unwrapList(json).map((doc, index) => normalizePartner(doc, index));
}

export async function getTestimonials(): Promise<Testimonial[]> {
    const json = await getJson<Envelope<any[]>>("/data/Testimonials");
    return unwrapList(json).map(normalizeTestimonial);
}
