"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var link_1 = require("next/link");
var react_apollo_1 = require("react-apollo");
var graphql_tag_1 = require("graphql-tag");
var MainLayout_1 = require("../layouts/MainLayout");
var NewsFeed_1 = require("../components/presentational/NewsFeed");
var NewsFeedWithApolloRenderer_1 = require("../components/container/NewsFeedWithApolloRenderer");
var withData_1 = require("../helpers/withData");
var POSTS_PER_PAGE = 30;
var query = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query topNewsItems($type: FeedType!, $first: Int!, $skip: Int!) {\n    feed(type: $type, first: $first, skip: $skip) {\n      ...NewsFeed\n    }\n  }\n  ", "\n"], ["\n  query topNewsItems($type: FeedType!, $first: Int!, $skip: Int!) {\n    feed(type: $type, first: $first, skip: $skip) {\n      ...NewsFeed\n    }\n  }\n  ", "\n"])), NewsFeed_1.default.fragments.newsItem);
var ShowHNNewsFeed = react_apollo_1.graphql(query, {
    options: function (_a) {
        var _b = _a.options, first = _b.first, skip = _b.skip;
        return ({
            variables: {
                type: 'SHOW',
                first: first,
                skip: skip,
            },
        });
    },
    props: function (_a) {
        var data = _a.data;
        return ({
            data: data,
        });
    },
    loadMorePosts: function (data) { return data.fetchMore({
        variables: {
            skip: data.allNewsItems.length,
        },
        updateQuery: function (previousResult, _a) {
            var fetchMoreResult = _a.fetchMoreResult;
            if (!fetchMoreResult) {
                return previousResult;
            }
            return Object.assign({}, previousResult, {
                allNewsItems: previousResult.allNewsItems.concat(fetchMoreResult.allNewsItems),
            });
        },
    }); },
})(NewsFeedWithApolloRenderer_1.default);
exports.default = withData_1.default(function (props) {
    var pageNumber = (props.url.query && +props.url.query.p) || 0;
    var notice = [
        React.createElement("tr", { key: "noticetopspacer", style: { height: '5px' } }),
        React.createElement("tr", { key: "notice" },
            React.createElement("td", { colSpan: "2" }),
            React.createElement("td", null,
                "Please read the ",
                React.createElement(link_1.default, { prefetch: true, href: "/showhn" },
                    React.createElement("a", null,
                        React.createElement("u", null, "rules"))),
                ". You can also browse the ",
                React.createElement(link_1.default, { prefetch: true, href: "/shownew" },
                    React.createElement("a", null,
                        React.createElement("u", null, "newest"))),
                " Show HNs.")),
        React.createElement("tr", { key: "noticebottomspacer", style: { height: '10px' } }),
    ];
    return (React.createElement(MainLayout_1.default, { currentURL: props.url.pathname },
        React.createElement(ShowHNNewsFeed, { options: {
                currentURL: props.url.pathname,
                first: POSTS_PER_PAGE,
                skip: POSTS_PER_PAGE * pageNumber,
                notice: notice,
            } })));
});
var templateObject_1;
//# sourceMappingURL=shownew.js.map