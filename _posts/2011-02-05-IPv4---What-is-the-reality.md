---
title: IPv4 — What is the reality?
description: ''
date: '2011-02-05T12:25:00.000Z'
categories: ''
keywords: ''
slug: /@kuppurao/ipv4-what-is-the-reality-1f1b2fe9a9bf
---

With IANA telling everybody that it has allocated the last blocks of public IP addresses, [media has started](http://news.google.com/news/search?aq=f&pz=1&cf=all&ned=us&hl=en&q=ipv4) its own interpretations of this, which have exaggerated and (incorrectly) extrapolated this to mean many bizarre things — ranging from “we wont go to work anymore” to “the world is coming to an end”. I wont be surprised if the superstitious people are going to their places of worship to offer prayers to prevent depletion of IPv4 space. Added to this, all the wannabe geeks have started tweeting and retweeting their and other people’s versions excessively. Here’s my take on the topic, in form of a Q&A;:

**What is an IP address?**  
IP address is a logical address given to any computer that wants to be part of an interconnected network of computers, very similar to the [postal address](http://www.livinginternet.com/i/iw_ip.htm) your house might have. Since internet is the network in question, a given address has to be unique and can only be used once.

**Come on, I am more technical than that….**  
Ok…IP address goes in the format of a.b.c.d where every number is a decimal equivalent of a 8-bit binary code. For example, the binary (bin) code of 11111111 would yield decimal (dec) code of 255 or the hexadeciomal (hex) FF. Bin 10101010 would be dec 170 and hex AA. Go on, open your scientific [calculator](http://web2.0calc.com/) and play around with these numbers. Since it is usually represented in dec format, the lowest possible number is 0.0.0.0 and the highest is 255.255.255.255.

**What is the “capacity” of this range?**  
In simple terms, it would be (256)4, but it is incorrect to assume we can have 4,294,967,296 computers. Several of these addresses are reserved, used for specific purposes (multicast, broadcast, network numbers) and a large number of them are consumed by the back-end devices that connect these computers together. The usable IP addresses are hard to assess because of the number of ways in which a given range can be sliced and diced.

**Why didn’t we go for higher number of bits?**  
At the time this concept was evolved (as of 1st Jan, TCP/IP is 27 years old), the internet wasn’t anticipated to grow as explosively as it has. In any case, IPv6 has been developed to accommodate, among other deficiencies, the capacity issue of IPv4. IPv4 has several challenges in addition to capacity — security, quality of service etc…

**Why don’t we switch to IPv6 this weekend?**  
You wish. IPv6 is likely to be the biggest bottom-up change that happened to internet. Making sure the newer hardware and software are IPv6-compatible is one thing, but making sure legacy networks can accommodate this change is no mean feat. After more than a decade of work (and still going on), companies — big and small — have been slow to flip the switch.

**Who controls the IP blocks?**  
[IANA](http://www.iana.org/numbers/) is the global authority in management of the IPv4 range and has been historically responsible for assigning IP blocks. IANA does not deal with individuals like you and me, it merely assigns them to regional registries. They in turn give it to ISPs and ISPs give it to corporations and corporations to individual customers. In general, IP blocks is not a priced commodity, IANA probably makes just enough money to cover cost of operations. For ISPs as well, IP blocks themselves are not a huge revenue generator. Corporations can usually get IP blocks if they provide a technical justification. Individual consumers usually don’t even know the IP address that gets (dynamically) assigned to their computers. However, ISPs do charge a fee if individual consumers would like to get dedicated IP addresses, because of the admin overhead.

**What is the recent hype all about?**  
We knew and we know that IPv4 situation will eventually hit the wall. IANA recently announced they allocated the last of the blocks and the capacity-full situation is happening sooner than we expected. According to one report, we will reach the absolute end of the rope by September 2011.

(Warning: Everything you read up until now are facts, and largely undisputed/ undisputable. What follows is my reading of the situation)

**What is the reality?**  
I don’t claim to be an expert on this topic, but I am a network engineer by profession and have been in roles where I have made/influenced decisions pertaining to how my organization accessed internet, which include several decisions on the ISP’s part as well. I have a reasonable insight into how this process works and here’s why I think the situation is fixable.

1.  Because IP blocks are not a priced commodity, yet part of the profit-making business model, they are given a treatment which resembles that of a precious material (or an organ transplant. I hope you get an idea)
2.  IP blocks are managed at multiple levels. Let us say I am IANA and I have 100 IP addresses with me. I give 30 to ARIN, 40 to APNIC, 20 to RIPE NCC and 10 to others. It is upto Asia to assign blocks to countries and similarly upto countries to assign it to ISPs within the country and ISPs to assign it to the corporations. Not everyone perform the same level of due-diligence before providing IP blocks. As a result, IP block hoarding is all over the place. For a internet superpowers like Google, Comcast, Verizon and the likes, getting IP blocks is _no problemo_. Even the smaller companies can get it considerably easily.
3.  Lets not forget the “government” category — they will the first to hoard IP address blocks and likely not to have the technologies to efficiently use them.
4.  While we are talking about approaching full capacity in terms of assignments, we don’t have the faintest clue on how many of them are being used. My hunch is there are lots of hoarded IP blocks which have never ever been used.
5.  There are several technologies that allow corporations to efficiently use IP addresses. For example, [Port Address Translation](http://en.wikipedia.org/wiki/Port_address_translation) can help — theoretically — 65,536 computers to use a single IP address for simple internet use. Even allowing for implemention constraints, my point is that — 4.3 billion IPs does not mean 4.3 billion computers. It means computers of an order of magnitude can access the internet.

In summary, my evaluation is that we are not out of addresses, but just lost them to lavish allocations and bureaucratic barriers in reclaiming them. By implementing bullet-proof governance, we can reclaim enough IP addresses to defer the issue to few more years. But that takes real work and real effort. Do we have time to do that before we run out of addresses? Is there a benefit in carrying out this clean-up effort as opposed to speeding up the implementation of IPv6? I don’t have answers to these questions.