---
title: A case for Route 53
description: >-
  Route 53 was never meant to be a core AWS service and mostly it is a
  commodity. Here I make a case for using Route 53 as your registrar…
date: '2016-04-11T02:53:07.916Z'
categories: ''
keywords: ''
slug: /@kuppurao/a-case-for-route-53-ed05ba7b7f8e
---

[Route 53](https://aws.amazon.com/route53/) was never meant to be a core AWS service and mostly it is a commodity. Here I make a case for using Route 53 as your registrar even if you dont use AWS’ core services.

Registrars such as GoDaddy use teaser prices to get new customers and start charging as much as $15 for a non-specialty vanilla TLD. Usually they provide name-servers for free, but there are several inconveniences of using services such as GoDaddy.

*   High prices for renewals
*   Very poor UI, exacerbated by popups and other lures to cross-sell services
*   Additional charges for simple add-on services such as name masking, domain locking and such

Route 53, which is one of the networking services of AWS, is simply a front-end for domain services provided by Gandi. The UI is deceptively simple, prices are 100% transparent, the hosting zone service is the easiest I have seen among many registrars.

AWS does charge for each hosting zone created ($.5 monthly / $6 annually) and it also charges for queries ($.4 per billion queries per month). While this may seem like a premium, it is a small price to pay for the additional features it brings.

*   Latency based queries ($.6 pbqpm)
*   Geo-DNS queries ($.7 pbqpm)

In addition to this, you can also implement health checks on your server infrastructure, so as to take appropriate actions. This is applicable even to on-premise infrastructure, but particularly useful when you use AWS infrastructure to trigger remediation actions.