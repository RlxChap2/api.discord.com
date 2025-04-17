/**
 * Requiers - FindByProps
 * data/findByProps.js
 * @author fox3000foxy.new
 * @description Sometimes, an experiment doesn't show up. With this snippet, you can enable it anyways. Does not guarantee the experiment to work, but at least apply the first treatment 
 */

let experiment_code = "2024-10_flamingo"; // Replace with your experiment code
let userExperimentOverrides = findByProps("getAfterRefresh").get("userExperimentOverrides") || {};

userExperimentOverrides[experiment_code] = {
        "type": "user",
        "revision": 1,
        "population": 0,
        "bucket": 1,
        "override": true
}

findByProps("getAfterRefresh").set("userExperimentOverrides", userExperimentOverrides)