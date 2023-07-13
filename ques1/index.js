import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const validateUrlSyntax = (url) => {
    const urlPattern = /^(http?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    if (urlPattern.test(url)) {
        return true; // URL is valid, proceed to the next middleware or route handler
    } else {
        return false;
    }
};

// calcualte the number
const numberManagement = (req, res, next) => {
       const urls = req.query.url;
    console.log(urls);

    const validurls = urls.map((url) => {
        if (validateUrlSyntax(urls)) return url;
    });

    const numbers = validurls.map((url) => {
        const lastnumber = url.split("/");
        return lastnumber[lastnumber.length - 1];
    });
    const numberArray = numbers.map(Number);

    console.log(numberArray);
    numberArray.sort();
    res.json(numberArray);
};

// now take the request

app.get("/numbers", numberManagement);

// server running on
app.listen(8008, () => {
    try {
        console.log("server connected succcss fully");
    } catch (error) {
        console.log("can not connectd to the server");
    }
});
