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
    const queryString = new URLSearchParams({ fields: '*', limit: '8' })
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

export const fetchWorkBySlug = async (slug: string): Promise<Work | null> => {
    const accessToken = import.meta.env.DIRECTUS_ACCESS_TOKEN;
    const queryString = new URLSearchParams({
        fields: '*',
        filter: JSON.stringify({ slug: { _eq: slug } })
    })
    const response = await fetch(
        "https://panel.braga.co.id/panel/items/works?" + queryString,
        { headers: { Authorization: 'Bearer ' + accessToken } }
    );
    const json = await response.json();

    if (json.data.length === 0) return null;

    const work = json.data[0];
    return {
        title: work.work_title,
        image: `https://panel.braga.co.id/panel/assets/${work.thumbnail}`,
        description: work.work_client,
        synopsis: work.synopsis,
        topic: work.topic,
        slug: work.slug
    };
};


interface DBPost {
    id: number;
    status: string;
    date_created: Date;
    date_updated: null;
    title: string;
    client: string;
    thumbnail: string;
    slug: string;
    synopsis: string;
    topic: string;
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
    const queryString = new URLSearchParams({ fields: '*', limit: '8' })
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

export const fetchPostBySlug = async (slug: string): Promise<Post | null> => {
    const accessToken = import.meta.env.DIRECTUS_ACCESS_TOKEN;
    const queryString = new URLSearchParams({
        fields: '*',
        filter: JSON.stringify({ slug: { _eq: slug } })
    })
    const response = await fetch(
        "https://panel.braga.co.id/panel/items/posts?" + queryString,
        { headers: { Authorization: 'Bearer ' + accessToken } }
    );
    const json = await response.json();

    if (json.data.length === 0) return null;

    const post = json.data[0];
    return {
        title: post.title,
        client: post.client,
        thumbnail: `https://panel.braga.co.id/panel/assets/${post.thumbnail}`,
        synopsis: post.synopsis,
        topic: post.topic,
        slug: post.slug
    };
};