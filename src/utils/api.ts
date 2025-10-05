export interface Highlight { title: string, description: string }

interface DBWork {
    id: number;
    status: string;
    date_created: Date;
    date_updated: Date;
    work_title: string;
    work_client: string;
    thumbnail: string;
    slug: string;
    synopsis: string;
    topic: string;
    subtitle?: string,
    service?: string,
    product_highlight?: Highlight[],
    tech_highlight?: Highlight[],
    hero?: string,
    gallery?: { directus_files_id: string }[]
    hero_caption?: string
}

interface Work {
    title: string;
    image: string;
    description: string;
    synopsis: string;
    topic: string
    slug: string
}

export const fetchWorks = async (): Promise<Work[]> => {
    const accessToken = import.meta.env.DIRECTUS_ACCESS_TOKEN;
    const queryString = new URLSearchParams({
        fields: '*', limit: '8',
        sort: '-date_created',
        filter: JSON.stringify({ status: { _eq: 'published' } })
    })
    const response = await fetch(
        "https://panel.braga.co.id/panel/items/works?" + queryString, { headers: { Authorization: 'Bearer ' + accessToken } }
    );
    const json = await response.json();

    return json.data.map((work: DBWork) => ({
        title: work.work_title,
        image: `https://panel.braga.co.id/panel/assets/${work.thumbnail}`,
        description: work.work_client,
        synopsis: work.synopsis,
        topic: work.topic, slug: work.slug
    }));
};

export const fetchWorkBySlug = async (slug: string): Promise<DBWork | null> => {
    const accessToken = import.meta.env.DIRECTUS_ACCESS_TOKEN;
    const queryString = new URLSearchParams({
        fields: '*,gallery.directus_files_id',
        filter: JSON.stringify({ slug: { _eq: slug } })
    })
    const response = await fetch(
        "https://panel.braga.co.id/panel/items/works?" + queryString,
        { headers: { Authorization: 'Bearer ' + accessToken } }
    );
    const json = await response.json();

    if (json.data.length === 0) return null;

    return json.data[0]
};

interface DBPost {
    id: number;
    status: string;
    date_created: Date;
    date_updated: Date | null;
    title: string;
    client: string;
    thumbnail: string;
    slug: string;
    synopsis: string;
    topic: string;
    subtitle?: string;
    hero?: string;
    overview?: string;
    main_point?: Highlight[];
    summary?: string;
    gallery?: { directus_files_id: string }[];
}

interface Post {
    title: string;
    client: string;
    thumbnail: string;
    synopsis: string;
    topic: string;
    slug: string;
}

export const fetchPosts = async (): Promise<Post[]> => {
    const accessToken = import.meta.env.DIRECTUS_ACCESS_TOKEN;
    const queryString = new URLSearchParams({
        fields: '*',
        limit: '8',
        sort: '-date_created',
        filter: JSON.stringify({ status: { _eq: 'published' } })
    })
    const response = await fetch(
        "https://panel.braga.co.id/panel/items/posts?" + queryString, { headers: { Authorization: 'Bearer ' + accessToken } }
    );
    const json = await response.json();

    return json.data.map((post: DBPost) => ({
        title: post.title,
        client: post.client,
        thumbnail: `https://panel.braga.co.id/panel/assets/${post.thumbnail}`,
        synopsis: post.synopsis,
        topic: post.topic, slug: post.slug
    }));
};

export const fetchPostBySlug = async (slug: string): Promise<DBPost | null> => {
    const accessToken = import.meta.env.DIRECTUS_ACCESS_TOKEN;
    const queryString = new URLSearchParams({
        fields: '*,gallery.directus_files_id',
        filter: JSON.stringify({ slug: { _eq: slug } })
    })
    const response = await fetch(
        "https://panel.braga.co.id/panel/items/posts?" + queryString,
        { headers: { Authorization: 'Bearer ' + accessToken } }
    );
    const json = await response.json();

    if (json.data.length === 0) return null;

    return json.data[0];
};

interface DBTestimonial {
    id: number;
    status: string;
    date_created: string;
    date_updated: string;
    message: string;
    name: string;
    role: string;
    person_image: string;
    company_image: string;
    work: number;
    company: string;
}

export interface Testimonial {
    message: string;
    name: string;
    role: string;
    personImage: string;
    companyImage: string;
    company: string;
}

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
    const accessToken = import.meta.env.DIRECTUS_ACCESS_TOKEN;
    const queryString = new URLSearchParams({
        fields: '*',
        limit: '8',
        sort: '-date_created',
        filter: JSON.stringify({ status: { _eq: 'published' } })
    })
    const response = await fetch(
        "https://panel.braga.co.id/panel/items/testimonials?" + queryString,
        { headers: { Authorization: 'Bearer ' + accessToken } }
    );
    const json = await response.json();

    return json.data.map((testimonial: DBTestimonial) => ({
        message: testimonial.message,
        name: testimonial.name,
        role: testimonial.role,
        personImage: `https://panel.braga.co.id/panel/assets/${testimonial.person_image}`,
        companyImage: `https://panel.braga.co.id/panel/assets/${testimonial.company_image}`,
        company: testimonial.company
    }));
};

export const fetchTestimonialsByWorkId = async (workId: number): Promise<Testimonial[]> => {
    const accessToken = import.meta.env.DIRECTUS_ACCESS_TOKEN;
    const queryString = new URLSearchParams({
        fields: '*',
        sort: '-date_created',
        filter: JSON.stringify({
            status: { _eq: 'published' },
            work: { _eq: workId }
        })
    })
    const response = await fetch(
        "https://panel.braga.co.id/panel/items/testimonials?" + queryString,
        { headers: { Authorization: 'Bearer ' + accessToken } }
    );
    const json = await response.json();

    return json.data.map((testimonial: DBTestimonial) => ({
        message: testimonial.message,
        name: testimonial.name,
        role: testimonial.role,
        personImage: `https://panel.braga.co.id/panel/assets/${testimonial.person_image}`,
        companyImage: `https://panel.braga.co.id/panel/assets/${testimonial.company_image}`,
        company: testimonial.company
    }));
};

interface DBLandingPage {
    id: number;
    h_headline: string;
    h_subheadline: string;
    h_ctaText: string;
    h_partnerLogos: { directus_files_id: string }[];
    s_sectionTag: string;
    s_headline: string;
    s_description: string;
    s_services: { title: string; description: string; tagline: string }[];
    g_headline: string;
    g_description: string;
    g_ctaText: string;
    g_features: { title: string; description: string }[];
    l_headline: string;
    l_description: string;
    l_ctaText: string;
    l_features: { title: string; description: string }[];
    t_sectionTag: string;
    t_headline: string;
    t_description: string;
    t_industries: { name: string; icon: string }[];
    w_sectionTag: string;
    w_headline: string;
    w_description: string;
    w_ctaText: string;
    c_headline: string;
    c_description: string;
    c_ctaText: string;
}

export interface LandingPageData {
    hero: {
        headline: string;
        subheadline: string;
        ctaText: string;
        partnerLogos: string[];
    };
    service: {
        sectionTag: string;
        headline: string;
        description: string;
        services: { title: string; tagline: string; description: string }[];
    };
    geodashboard: {
        headline: string;
        description: string;
        ctaText: string;
        features: { title: string; description: string }[];
    };
    logbook: {
        headline: string;
        description: string;
        ctaText: string;
        features: { title: string; description: string }[];
    };
    testimoni: {
        sectionTag: string;
        headline: string;
        description: string;
        industries: { name: string; icon: string }[];
    };
    works: {
        sectionTag: string;
        headline: string;
        description: string;
        ctaText: string;
    };
    contact: {
        headline: string;
        description: string;
        ctaText: string;
    };
}

export const fetchLandingPage = async (): Promise<LandingPageData> => {
    const accessToken = import.meta.env.DIRECTUS_ACCESS_TOKEN;
    const queryString = new URLSearchParams({
        fields: '*,h_partnerLogos.directus_files_id'
    })
    const response = await fetch(
        "https://panel.braga.co.id/panel/items/landing_page/1?" + queryString,
        { headers: { Authorization: 'Bearer ' + accessToken } }
    );
    const json = await response.json();
    const data: DBLandingPage = json.data;

    return {
        hero: {
            headline: data.h_headline,
            subheadline: data.h_subheadline,
            ctaText: data.h_ctaText,
            partnerLogos: data.h_partnerLogos.map(logo =>
                `https://panel.braga.co.id/panel/assets/${logo.directus_files_id}`
            )
        },
        service: {
            sectionTag: data.s_sectionTag,
            headline: data.s_headline,
            description: data.s_description,
            services: data.s_services
        },
        geodashboard: {
            headline: data.g_headline,
            description: data.g_description,
            ctaText: data.g_ctaText,
            features: data.g_features
        },
        logbook: {
            headline: data.l_headline,
            description: data.l_description,
            ctaText: data.l_ctaText,
            features: data.l_features
        },
        testimoni: {
            sectionTag: data.t_sectionTag,
            headline: data.t_headline,
            description: data.t_description,
            industries: data.t_industries
        },
        works: {
            sectionTag: data.w_sectionTag,
            headline: data.w_headline,
            description: data.w_description,
            ctaText: data.w_ctaText
        },
        contact: {
            headline: data.c_headline,
            description: data.c_description,
            ctaText: data.c_ctaText
        }
    };
};

export const searchBlogContent = async (query: string): Promise<{ works: Work[], posts: Post[] }> => {
    const accessToken = import.meta.env.DIRECTUS_ACCESS_TOKEN;

    const worksQueryString = new URLSearchParams({
        fields: '*',
        sort: '-date_created',
        filter: JSON.stringify({
            _and: [
                { status: { _eq: 'published' } },
                {
                    _or: [
                        { work_title: { _contains: query } },
                        { synopsis: { _contains: query } },
                        { topic: { _contains: query } }
                    ]
                }
            ]
        })
    });

    const postsQueryString = new URLSearchParams({
        fields: '*',
        sort: '-date_created',
        filter: JSON.stringify({
            _and: [
                { status: { _eq: 'published' } },
                {
                    _or: [
                        { title: { _contains: query } },
                        { synopsis: { _contains: query } },
                        { topic: { _contains: query } }
                    ]
                }
            ]
        })
    });

    const [worksResponse, postsResponse] = await Promise.all([
        fetch(
            "https://panel.braga.co.id/panel/items/works?" + worksQueryString,
            { headers: { Authorization: 'Bearer ' + accessToken } }
        ),
        fetch(
            "https://panel.braga.co.id/panel/items/posts?" + postsQueryString,
            { headers: { Authorization: 'Bearer ' + accessToken } }
        )
    ]);

    const [worksJson, postsJson] = await Promise.all([
        worksResponse.json(),
        postsResponse.json()
    ]);

    const works = worksJson.data.map((work: DBWork) => ({
        title: work.work_title,
        image: `https://panel.braga.co.id/panel/assets/${work.thumbnail}`,
        description: work.work_client,
        synopsis: work.synopsis,
        topic: work.topic,
        slug: work.slug
    }));

    const posts = postsJson.data.map((post: DBPost) => ({
        title: post.title,
        client: post.client,
        thumbnail: `https://panel.braga.co.id/panel/assets/${post.thumbnail}`,
        synopsis: post.synopsis,
        topic: post.topic,
        slug: post.slug
    }));

    return { works, posts };
};