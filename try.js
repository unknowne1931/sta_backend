function kick(data) {
    console.log(`Kick : ${data}`);
}

async function kick1(data) {
    console.log(`Kick1 : ${data}`);
    return async function (params) {
        console.log(data);
    };
}

const Data = {
    name: "kick1"
};

const functions = {
    kick,
    kick1
};

(async () => {
    const fn = await functions[Data.name]("1931"); // outer runs

    if (typeof fn === "function") {
        await fn("ANYTHING"); // inner runs
    }
})();