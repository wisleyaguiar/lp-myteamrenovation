// js/config.js — every client-pending value (XX / ⚠) lives here and only here.
// Anything left as "XX" is treated as "not set yet" by main.js.
window.CONFIG = {
  CAMPAIGN_START: "2026-11-20T00:00:00-06:00",  // P1 start (Houston time): only drives how full the tape bar is
  CAMPAIGN_END:   "2026-11-29T23:59:59-06:00",  // P1 campaign ends Sun Nov 29, 11:59 PM Houston time
  CONTRACT_DEADLINE_TEXT: "Nov 20 – Nov 29",     // P2 contract signing window
  SPOTS: null,                                  // ⚠ P3 spots before the holidays; null = generic text
  PHONE: "(832) 878-5912",                      // ⚠ P5 van number; confirm
  RESPONSE_HOURS: "24",                         // P7 "Leonardo will call you within 24 hours"
  GOOGLE_REVIEWS_URL: null,                     // ⚠ P6 null = link hidden
  VSL: {                                        // Vertical 9:16 video (Vimeo), 51 s
    provider: "vimeo",                          // "youtube" | "vimeo" | "wistia" | "mp4"
    url: "https://vimeo.com/1248473087",        // unlisted video? use https://vimeo.com/ID/HASH
    poster: null,                               // cover = assets/img/vsl-poster-* (set in index.html)
    width: 576,
    height: 1024,
    duration: "51 SEC"                          // label on the cover: WATCH · {duration}
  },
  META_PIXEL_ID: "1144587204762495",            // Meta Pixel / dataset (MTR)
  GA4_ID: "XX",                                 // ⚠ P9
  ADOBE_FONTS_KIT: "XX",                        // ⚠ P10 kit id (use.typekit.net/{id}.css); until then: Inter
  LEAD_ENDPOINT: "api/lead",                   // → /blackfriday/api/lead (src/routes/blackfriday/api/lead.ts)
  // ⚠ Reviewer photos. Today they are TEMPORARY stock photos (preview only).
  // Set to false before running ads, or replace assets/img/rv-*-160/320 with the real photos.
  REVIEW_PHOTOS: true
};
