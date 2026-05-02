const axios = require("axios");

const BASE_URL = "http://20.207.122.201/evaluation-service";

const CREDENTIALS = {
    email: "ys8665@srmist.edu.in",
    name: "Yug Sosa",
    rollNo: "RA2311056010128",
    accessCode: "QkbpxH",
    clientID: 'dff112f9-93c7-4545-8089-b2a9e4e49ec7',
    clientSecret: 'RtBCcSbWuPTfMeQX'
};

const TYPE_WEIGHT = {
    Placement: 3,
    Result: 2,
    Event: 1
};

const MULTIPLIER = 1e12;

async function getToken() {
    try {
        const res = await axios.post(`${BASE_URL}/auth`, CREDENTIALS);
        console.log("Token fetched successfully");
        return res.data.access_token;
    } catch (err) {
        console.error("AUTH ERROR:", err.response?.data || err.message);
        return null;
    }
}

async function fetchNotifications(token) {
    try {
        const res = await axios.get(`${BASE_URL}/notifications`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data.notifications || [];
    } catch (err) {
        console.error("FETCH ERROR:", err.response?.data || err.message);
        return [];
    }
}

function getScore(n) {
    const typeScore = TYPE_WEIGHT[n.Type] || 0;
    const timeScore = new Date(n.Timestamp).getTime();
    return typeScore * MULTIPLIER + timeScore;
}

function getTop10(notifications) {
    return notifications
        .map(n => ({ ...n, score: getScore(n) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
}

async function main() {
    const token = await getToken();
    if (!token) return;

    const notifications = await fetchNotifications(token);

    if (!notifications.length) {
        console.log("No notifications received");
        return;
    }

    const top10 = getTop10(notifications);

    console.log("\nTop 10 Priority Notifications:\n");

    top10.forEach((n, i) => {
        console.log(`${i + 1}. [${n.Type}] ${n.Message} (${n.Timestamp})`);
    });
}

main();
