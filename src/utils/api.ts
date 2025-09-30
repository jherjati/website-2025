interface Work {
    title: string;
    image: string;
    description: string;
}

export const fetchWorks = async (): Promise<Work[]> => {
    const accessToken = import.meta.env.DIRECTUS_ACCESS_TOKEN;
    const response = await fetch(
        `https://panel.braga.co.id/panel/items/works?access_token=${accessToken}`,
    );
    const json = await response.json();

    return json.data.map((work: any) => ({
        title: work.work_title,
        image: `https://panel.braga.co.id/panel/assets/${work.thumbnail}`,
        description: work.work_client,
    }));
};
