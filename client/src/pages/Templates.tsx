/* ============================================================
   TEMPLATES PAGE — D&M Labs
   Design: Matches D&M Labs brand — warm off-white bg, blue-cyan-violet
   gradient accents, glassmorphism cards, dm-card system.
   Key feature: Real screenshot images displayed inside browser/phone frames.
   ============================================================ */

import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { X, Monitor, Smartphone, Star, ArrowRight, Check, ChevronRight } from "lucide-react";

// ─── CDN URLs for all 4 restaurant templates ─────────────────────────────────
const CDN = {
  r1: {
    card:            "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/tmFqZzxmDeoWkTaZ.png?Expires=1804076303&Signature=PSxLKGi0ssJYHYtYfeZT5JWtJoE-NDZSmGytutjCJ5mYLkYMj7RGnMYiDwUk9RFK97NR5mN5l2G1bl0Qx1HRw1~6K~VQf2BMqsSja4JdByVLdNnFY1EqRv142TsTl2lGbaAX9Q5knyEzzKSAmL5rMsgbxPEfDTIcfdn-4fr43gjS3zgE7~u8tu2I9LrsedFK8dW4dYFLmGGq6zizLMM~~3j2ZZ4X3MMXSfTA0syBbsf8mSZaijCxW6LVuug7CKbeJBYqL1V0VcRxAT2CxybfF9~eRvBm57tzGzphLlEoHV3Y7MU69UYhqMrwPjLybfYCWlK5YaiuXrWBUlwHRcU35A__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeDesktop:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/kXrYLAFJnVyYoBgn.jpg?Expires=1804076304&Signature=Baum3x7OEfuvLshOvLIOLKrq1IK9QLG5cHzoc14EYz-Nb3v1Ku0jFmb4RPKVFuuuVFtVRAcy6Kp9IHNlxwSmOrrpH-fKhsQL9Po9wgib4fjukJdHR~f~F050BXrGqMxiCp3cBXoxn8i7EVOS-nFIh3RKU22QCZWt6MliYQr0S3KfJZvg5eqm-HXtkVvXFR-MnnZVVIvMuOKOIHz0Q4k~dxXjgWxatniIVZmbv8q7EMJeItKLe-MJZAlxhWR8f3XgC~YlRCzshST1aSZeGqvv~dFDOQ4KtqFLQgC3CqRQF9nVKtsa~PbhBydUrNE0j779QngMty6BRcwsQ7mDPYJWdA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeMobile:      "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/PoZlLiGIccoUNNsS.jpg?Expires=1804076304&Signature=gpFwTOPqltbtiRclu9HvuRcXBmvjsk1qkZM1xK6iauTNxJFzBnKaOTnoqZMt7UBTw7ZXIIMFfCNY9hiV552BlputX9YzTCqhL0n5lMGnNKz5zQsBUNaef99-nIvuLWH2YqNPPNEMB-FEggBcyOgOYv~YG23YENZ~jSlhKn0XgI9mkYG4wpoeZo~Q6VVYGRRw4m3CyMrVEl9TObbAVeC70PMaCtLAjfeQK9MWkoTe31nUi04gjxQY7f9~tKvGiAtT0-aTlPhcZxqFiR6PaTGBVT~VmGez4WaNqDcYdsFThYjn2HQp385hMA3HHuIZfVcSAHdXcmQZ1kWYzYe-IZR~jw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuDesktop:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/qHXZpjvwffODdJiO.jpg?Expires=1804076304&Signature=NRoDyluF5kufsDCRyrfE00iSyL651-7~l7d-FYEkCAInJwhMNfmT2WEhqLkjKHcwhHFZftTPHujd2TRB3I0~GuhIOSWLhp-u0fo0vhRPYbRMVRFgXPsuZ3t7NqLwmycDN8KzSmp2p2tt7TQJk43E-Hd8n1GgNRhhqfHht3yDxp1pkFungi0w-zVdFL42J14vTTGNbwgF7ex0eA5KGMA5QSDyVWFF3RrOAGTtsbw6biYKkdkXPOoU1QbB6kOA3OWfhMCIjzCfQ9cvFThJQUetQPvrINIi9Kg359L6RTiPJRlGwFs2kJ3lolOt0quMZAnepQ9uCu2yUv24ChAFutMz0Q__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuMobile:      "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/hLyyyoelceVrufVl.jpg?Expires=1804076304&Signature=b2jd-HfoFntBylZ7KylyDuWesto88kNiiqrnHBAp9DGs8~tJhRhJTeTEqyGXvZNo3TTZlHt8ocyL5dZscUzDsniNXgHrzdaWamVfqhbus9db1olLl1MulYGBsziCjCccKk1lMhIshauliiHFaPAvLGwLtytOJm66yajMuk9MjhPFzZHhT1I0ItmmZkloDdVzQIg9e3ABTXPydpODCJyoFJSF2dV60Diz5rIfoT3Rj2sTuYPDYEMeak0xbJCrqT57zPEYC1BgIPfO8z4Ttl88So0y5KvXZXlOKq6kp37N4KdFbwusl1HYLcARQ70UbgxS41ec6rl2Lh4jKcizMRF~5g__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactDesktop:  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/aZaxvuYYNALiSHxH.jpg?Expires=1804076304&Signature=XVIEtjZOTjsyNxvfyEb8USEg8u-Cz00MFEidiGcXNlFgrOwWTlzchaDb5iGSagu5RO8pratelJoJap7PFa3ZJh1s88jJ~tbCw-xc-blUautH~e78J06HIb0bCPV8dMXBxKf4yP1Il8hE4e379mwbgtX6yXpjNnbGsJMwAVmdSsto7zYAqI-hr6s9qi2mLlRrsp5HvOHzYTiH7~5sHb~LqwL16rZ1mxsBkc6O338aYVGBlof1iN~~Sz7ewLyOV~zlkO9o3~pzas6e9eFbX-z26BkMP0vHH9pewIrmvT9GTOnxobNItmZjgKOURHnYr7hwwsS3gFUllpvOR0ToNxSG4A__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactMobile:   "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/LYBEybvuJUWZWhSR.jpg?Expires=1804076304&Signature=UKOnxUBf3NN3b6BUHoTp1b881QjFgBBZm-vKX3FNLNCfUJC2kxIxnZXOljvCUl-HwlW-RamSRmNBqPwGOBlm7zD1dk9MtItCmm~GeH00lgIGsPJFAer96yO3xS4nE8OVQH~qn7w3B9ZCZz4A2RdmEmgtZxB124tFWzgFiFcE4h3K3QgQz30ua7DKfW4TdRGOyYBdrgd5irG5~GBxqr2sYcYKoA6d5tJxNyL~0TI2I34Min8RhHUjmBO-x11U3p2tSQ7yB8FxHmzZV-pFjGnjb2w2XoR3Mk7WrFMh4ySmME7tTXM4eqV7VktEvvmCBoXIX4jt5gzHL8cMWozTcG1xsQ__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
  r2: {
    card:            "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/sHXnEseXTWbIaCCA.png?Expires=1804076304&Signature=C2B1HYySmiwwBU0yVmG8fJmrJIHQ7~1t84zoCUtDt~NCLe4~IKuwZ18R36ocxMjgKGqBA3mHnIABVM5mNHzoYuvXe5i5Rv3HKCK~GSlxpsMkEVuRdf0Fx4OJZG3kpqVCCidLGYI2oYXOU5CH6DM3Y796OxROKtdh1wNFmCf3HzV5zlgo9CKuEdEi-U11rBOP1Rl~YCNzbS-mMpNtbirbC1F2d~gLvbWMCw7-iYcYuhpa6GeZGjCifWGDpzw1H~0cmSsodaGQYdENLP~D7T4MKc9NN4iuTQlONbKH~NpRaJBcMtQ477HfiEVyraiDzUXxb6ZRfUq6xHYLDzrZ9q5ZDA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeDesktop:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/NdDITTLsHObRMejY.png?Expires=1804076304&Signature=V8BdQOR4MSXTIZ0K~1K662HGa5o17ZEh1Q34BWvnAozZjgt8SMMLlfFj6sL19YkelnLRVbKh97yv4dNxh2X2IlGzpYWK7eIFQ~140st42HdYVOibkIY-2Tw5mNaIGSbr4UDtbIavk0C4et51bZsZJepbFfJeNNUzHyaY4wNENRTSNbyqbqdAwmVdojOC6Nqbj-QpR4xm8OOCqxFvRCFMVIA0elcc0IbQk-X8Zu5LST36qDEuHrxKUVqTSk5xGdM4AiARoyMLTb8KdumwzDe7FZVbg~H4SpNlSWjkhbhIvKmzy1~c0LnPNfmnTcZXTPMPPPphUmY8Fd2x5GRtO8M8gg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeMobile:      "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/BYkdRucNjRIOobqA.png?Expires=1804076305&Signature=T~Sy8j0yTvPmLa9PvOoyP~hatc~2w4EZFFtMA4aXE-Kwqj4c5-t8F9KfJiAWCtufQvl0DEbtg1WeR1n2jXsASMS6cp2Nnr19p1GJfEv95h9vS3JjvnGVB0jXLDdvF~JD1JsjOXHQlbOAr56nO2WxWSJaSl8n78dQWzhTnZY3ZoRUb676WmYdsdmMqKCis5~5l4H6M7BjLEN1QAHCTnVjrv5ZKEFX9fAFIkK8h26PYoQMzpCVykQkVb7XSFo4ZGE~hTKxZuILoqgZXVHVya-um3wW7JtjVJc5JJd1c7YoLcRkWMfpmjrDJ0RK88BDr6ivOVWS8LnDsJcoyU9rcdsYGg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuDesktop:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/arqMXpWnFDGOUOyU.jpg?Expires=1804076305&Signature=NmYxMY~plfDViMQt~Ilj~2iDLGxLKk192NpEpuqPdOAVQkkx5BCrPrG6ZvS80z0CMQUrnuQz02X8-5gjw~lKLiaPF4~pKOCU0vaSk-Qea0HitruGtrTAyb6DXuosRRQbRuUkRrqaUQxkx~pjxZeZwJfocFsUZ~7pitLoZSLeX9pT0QhxQMPyPaItwIe2RgpcO1dhYKmP3jkHjSolvRwN5ZfkOvbO4KgMzMZAWSDBk2M2F2PjW2f1-bQcfsV3OLctPxMymB-JvH4Muk~S8cPLAm8S9wfEPv5R-WmabzoODPo1selJJjBH480b4Nu7UN2bb2p-CO-rHFcviFI0fPW6ng__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuMobile:      "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/QufHDweUQeLqMmtI.jpg?Expires=1804076305&Signature=c1HQXY8DNFQKPCJZuZ3TOHkx0mDn9iw7vrQ3YawcL3~3trOeStYO1bXSu9DJ2j2mHRlX4-JKn908FYJoVKiXAZkfbYXuYUdsfa4Jz--~L7rQTPb56o7st9gfprsJUP65DxCiBfo1OGnQkIAnwQzvH6B0VSksqpTKa4Sd9XwkwA8wyMUXEvSpjnefWYTQpioLcXHBPdxJOsoziY5v8V-WN1-brWA9i3Vc5lQFQ0J6y0rIRZ3-ru9s8DOE3hcSvjJUMkoJfhl12pq9aK~DDD~DKqB1FT3xMm4L1ylDJlq7TOBHjmpnBTW4DRdgkTzWrhoT8dxX8zJink5fSEu8O5UCvg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactDesktop:  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/pJQbrKcKMiheiPdB.png?Expires=1804076305&Signature=MSXow448vKZ6X08SfGNK1koIdauP30ZYpu48MrnkP2mt9VsFFGDMrS6dDzXMzUjBESL-8bkJ7QXAwpWStD6FXrtCnAlNnkSkc-gLLg54it0jZkkm-ju1ENvYB6EQIbaDQ0PaUmYVTvRdnXkZJ1afbV2PbiMfN2YoWRxQqBnxh7UBIeL84P717fay3hguLsqceiTRSErPZ5830GuzEu9g~fO-P62PXOJVWbXhZoDzSpVSTeUxKCuIvTiYa6HHzRHkbRsJs1He4E2fEDTJf6WipNnwdQ8KOyrZx3ZElpGZ~nGCJ9eC95gSx37hUvjlGepy5WIdgWnAuFSEdB5hNdcv1Q__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactMobile:   "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/qMxAsoknRHVYNZbo.png?Expires=1804076305&Signature=EGwB~gZOwSMkbNfqHVoYyhwTnS1hv8BWlqUJLgkY-K7aCpbfoWFWik1QYMRcv~BtYZ3w6g1IRcXcq6To59WhSmu6dvp7HWXW7bZWlO3m8GLIY060Ym5vzngP6bF~vPFWbzMAXPPhulfKDQQVkUePL0of6zOV9wrwBFaNiKYU71Hk1FucWxVDEVuBe9c~Y-FM5tnotF6qF8bxCBJ5eafzHdIJ6eFPHTB~KFWIys-d~oeWGyMCOW4rKbuYi7KfZ1xRlXsmEVaC3-QC-DLQOA6GaECrUAS3qsvGmiPuzm5s2ZH62V0LX~JnR2mo2WnZBwn4qHYOCGRoH51UGXB7sIWpMw__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
  r3: {
    card:            "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/xiQWzupRkfEUJVuk.png?Expires=1804076305&Signature=vEjblmut16g39WJ~6yCYIDhXjKUxeVxzYNzVvzi9YyXMB2qL7iQgOaBRsLUgz3o9-BzlWTGvJk76gdlB~9deAOoKU0hsieZgBcjNv9WwBAyn0LEjlAgpu39a8Cd5RavEtuGboaa9IfHOqf6ujyYu81D9m2j4u-aLynH6CUu73Pjj16IFuvWvCq4w692QAkO~CA~x4xW3Fa3z0KwJgCYgYyt-mIQehUGe-8ddm~ABoBLevdFXWwKYCyj3ccddm8hI4YEkHeKMz5LeJazgjhv1~WKxcO6E6RaSPUKUNuY1WTHUi0WsNMnrT6Lse2ax3MWRHcePItBZOlsl9F9k4shJNg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeDesktop:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/scYOZcbRRfuhinXn.jpg?Expires=1804076305&Signature=nQEMfhoOUX7qPBaPD0EQd9zi-Sak3yaSFAUjH633fUzFu4~S6VGHfXQBwNa8SaiX7mtml~PKW0sUVnQ9eKe4aBhzjcyBpyiZpope~5jbwXsOJkSOI8q~ZqFjD1upmCURsx56-vVixGMR--GdDICycnxKt50qZQfOj63lvR3-5TxPTuuHFC86kOMEinav0poFW~yKIdZVrKmFj4PXe~S3Y4-ILHjg5jUCfyRs1B6oy9ilSmJIBSFoMoe69ZJQ5Sn3KPdf5tCSf32Y2X7UzT9F3nAtBus35kp-SUgToI6SNEB~GQPuLs5-I5lLS4rIaxsmBIBZ6W4E~FNBM-w41QQoGw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeMobile:      "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/lOFavtuGhoYBaIif.jpg?Expires=1804076306&Signature=eyEb0GlelV2LT23HFmSUOG~9oHl8T4Q4CHFoUkXTBC2Qg~JxlYduq1dRaMjxGSnsm0snHSNutJNRzaI6u2BfpKyApr9H0B~Mzh21t~VG6ITR-wZ4Di8qlssT4deGiok7-nzUk1OdrDrTrTlA~ek6w19~VNnMILUNpIVF-86G7tKbs7ZL79ZlJ7RgZI9jFxy6wICsATVe0PXsBGHYr8leY1HBM95-FWzwfavHJe4grvyKwzs4YFVyZlAjVoWoM0jtLTDggKvbZDNfE4J8peSlDHNh9KRm~2XNkXeepBWKFkU6S65Bo62GinTeF~PTBFUWnPGEt3nImrDLXvThwwShKg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuDesktop:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/jeWJcOYQuvOvrqiu.jpg?Expires=1804076306&Signature=s~qLmBFcYpv6GRDHIwttV55VMlQgNW2IpT3FP8Zc5g5WUmOpEzyCr-6j4Wb3RZOHhnbguo7U38lHj-ppx34XgnRxN8BMmyzhtwvX44dtSWx849gXq0FxeLQpyE1xIitETve1lY0fvw2HcZMARBLKyOBufDmN8uaDUvap841INRujpL-MKBlawgf~MW71h9x2SQYg1oigpf20wWcN3tIdXGtX4AhVZmXugJ1APZLkmAeCamdT6e9YBPTtXPRJnxYvafT724V4SfWayW0kIPmlQzp68lN14cWsd0bwYB5JTskqoYVSnzY1hpAFPzFbNu4cZCK1wRtZ7-K75L9nk-u4Tg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuMobile:      "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/SPqyFcCOrwRyiiFK.jpg?Expires=1804076306&Signature=OTrnVU0rjAbPuA25Wn47jS~lIIvzfnwd1UAlMJMQqHSYZTAqMnRsKP0fWTZ1csIvL3L3ApYVDckwoZ3lIavvlysdULQ8c3jsYORY-oHp5opdH8LMjLocfyY7RbH4Cdl4SpOu6ef1kxammgZNRQRkbi4YQsH0dbAKdjT6KcB1AyLU6--7~swgK9Rpk3J0wuEWUHRg2XTNFXFRvI5vyEXVcXeZtkNUfSyNRxRAP-sUx7BrFX8Xjs0bIUqppPagfhc2BwkLt~z1f0lV1PM2fDFKEvyn6IFPQZLQLjI3zmA6KCzhhoNMj2w6Z6HSij3HvTfc2jwq43AwAJI1Mji4eDJPDA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactDesktop:  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/slHwglXXNESuJCNJ.jpg?Expires=1804076306&Signature=KkrBQ3vOh58n-Au40aEOUdhfQbzy1B-bD~BC5ufgsoBCajaz-eY~7vyoY5HzhUfPGkN-0WQOZQ52s5g1E1V37~x3-sEJ3Hyw9SdjFZH3jd0H59Xg4IX1LI7LEld6Pjz4pQDWpkkuXaugIqLmQKa01UUzR6Z8Z2dbSn9uolIks1JglJqPyaHeX0ZC0s7Wkwdyjo5Tj-RnjTDPpHpcAwOvWIRphS81zHOQfP9XqAYyJGSqvF8dHwtpMCJS1WwO5SUf9GATaGm2bwF8MZ4oKUOn8nvvvoZC9AhIpEaePmWXaJ7q8ycLKIYLe~tcax0wy~npo5QrV-nXJAghIizIjru8gw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactMobile:   "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/XzlkPOBLaTJJyWMU.jpg?Expires=1804076306&Signature=YVn2A5pcVyMn0bygw-jhdLX2r-5GL9x2yhrSs1A3UO5NaHB~Ch3Yr7XIM4~T~VkJSNuRw2K7YwRxkCcN6~TpLVfcThw7yPx18kVag7RcNuJmcNWXQ-MdATU5wdxp1HUQDqAHi0Oc75FXc~2dLsjIBvt8qsdJuZhS74srQF3d2ojRuTliAasP07lNaH9qLEIwc2M6p1Yf83CRUpWifUqQCbsP5fnS6rhuLqLEPHumS6EfCqbV~cmM9VPBctoy4k99DhRbar4yaDQ04esHTbXc0zfxZeFnhZ9z8UafoRt5K49-06TmBhmzLhTrkDiXBgqgFYX881VheyvXaKRXj6keIw__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
  r4: {
    card:            "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/HgPzeKCzXZQlPwvE.png?Expires=1804076306&Signature=Uq2pH2MyIxD4fN4C8hhad7gDI5gkh5lcrm9oftiD1vYTg3W1QBsln8854ZIw6e1eSfriLHeZjsASGMZ5eHS5k41z00tES9qpFoWVVc2Tttf7ModSQe0IWrPZFIIxVEjKs~G38evpuPcwx4Hz2oeZezzUxUcRDg-Y9F8Fn5ShZsTugOfjgDM0l5-Nt-1NhCOJG0B-1cclG8pTjI-D3Rb~uMGSxXcWTUglzipop7ZGfLR3z3-zPQ-1chvyG5YRc8LCJnK9s2DacaLIoC249yRN5zlUwZmBQ5Mf2lum16qPB2AP9F-gWS2Ebq2tTseFqM-BVzMjx6Yvv4wckHtTzfJQMA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeDesktop:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/IDQFkocMcEbAUdeA.jpg?Expires=1804076307&Signature=LeJuVsR-WMebp5OWHKDSKW6lvywa0JF8qAc~4I5mRWBQvqBiovK-us383etmAtYIhGM0PT~tF7w2pECQp~qNtqXmLwob5UOa1xGtBvmLMHXFUFrzu-5ndL9iof7TCjAyvMxpS8HIrV51UuqeCvbkMQ6ZdFc8JhSuxX~cP8lOZ13MVhVx7sr-HerY~FUYW6a3WjZehhESq326mjaY2AXA97zSaZUwPgPsLwuHprlXmECVLWkjdjZTyzVXcPH8-oOOfNaQUW13k8HW68h9Y6Gw3qn9soGB8MkhCDD4fP9dNq1kDKNUWlaVMVBPEEU9CA6StEEhLxdKBs1ianD8nahbgA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeMobile:      "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/loMwjtaOgszXDVDp.jpg?Expires=1804076307&Signature=hqOHbBXAzM5orZsd8n~p2v4Dvv6rEYz6WUYHei2xHWt~w9mTh2iSFpXHd4-H~kgjr9jNOmVvVQK8xRST~0FG5OABfu-bVnnPCxU4QneYia~vl16OcHon9J-LmTbQ5CjqsoJRDNBUoWOQKYXuABab5526Izmt7Gq82ioRwEsugfZU3eM4z9-nVB4UHgzu9ohyQmorUhy0Fo6gOA48sX18KZGx~2C9bszhhppFIihY~pkLbaWK-lFzFBCxQs8A4Dx-lrKeFH8PMi0m97an6sC-zPHTz0ABBhxX4c7uoSUkl2h00h9V7wJx0uwlnYUKxMQkUdX8~Gc4fH3o~GVSG4CW1A__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuDesktop:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/OirpOMxlDDBNYdQD.jpg?Expires=1804076307&Signature=TckmnizezFBKjHk65-hfeTg8xxobBi5WQysUxbNHtyvIz7tw2jzrgePMu8yCmQTrT8bcIEQXjfZBODC84hg2paIFP2bOGnfutfELu-SSdSi8~Yqvr5FBFzU0q8rw6hIDJlakbz1iMV59A0Xy7VNvHZq9OWcv6HkQrX2TlaMw1b4Y3iqlQPBWNCF5hqKUQMm3nGpXvwrwLbU5hc431VEHW-qmSI-yZnDk0L5AK75NfZLonIlkbihJRih214m6ULllWUL-MM2PQpsmPWcYXZ5H91eWeDAW7xiLIKu2cvoS3TjMrIbb4wehaJrIxqnBdPoywSt-2JIPQMe-ZYL3SZQ9pg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuMobile:      "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/FuMqAmuubBwExkBc.jpg?Expires=1804076307&Signature=QUdRiNFdh~PtgHkdK1whQRpqgzGgNZqcNwhxkaV2XgoYa4He-ViKpvypEroZExkX64c6NTy6PgXhAGBHEcZuUS7u52J8NWEZK-0ViBict~7sIk9VbpXLcr7eO0LpRBXT45zDZkmgmB0JkcaLo7dMxN80DwmBTEvXnGkHP1B6S0PZcLF4R28MZReTYLebm~4BAClx6ACL6tGh4Oy~0edsFLF29U0Fych-a01yddezOHYw-6VoTp-0G3vIBdYMzaabvo20pUL5e75a-R0-LWO7fVbuDfKAcHDh-luLyVTr6ZT2rxmlPsZPPjJ5pT8WgB4BAAkHFu1qh8NIMIAr4x8L0A__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactDesktop:  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/YvIBqshkUgHaXrDz.jpg?Expires=1804076307&Signature=r43l3K90A6YYhxIcTXByzXLPtyaK~IQKctz8bpLPbgKWg31R1iMAso~bPmfS3h5nzr6p8rdHhbvSbURm~5f9AxRILPxnsJ1-yhEwhJwzib4WbLM82yGr-3uRiFn~Y-142AOB~USXqUxI9ljajVbEY75vXN2twMq6Yc871ya3VKuGPMjaIO60OpvpY3FKIFwwIZjuGTKMQmgeHGJ7vj525GKwQ~rp2Nk90KYUm9tdfKdzfdgdMorkBm4bc-7-WorvZ3ZCmJfmNr6r-A6qCiCoaYEI~7Ltu-F-cyOVlfZG8PYY9PBmhQJIXtbR-cHXVYU8PP1s9iK2g3oC~OyqeUpubw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactMobile:   "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/mSkOIiZQAFfvegkQ.jpg?Expires=1804076307&Signature=q2kKNwkoEjtTEz9KC5gmLIGvesz0AMTwcCdJ15f1JbmRcLV-eZP6CwkkNn1UhE6XcrzVnPro9e7CegKosvjCuc8KzR3hoqR9WAqdDI-fyAZo7oPlnYb078c-GCBY9CrVAN~mjVL9tIzWHQBz0XWB8qKQMMF390EBeEsEjl90wLUGA0ZOGR143RtSwGxFiI7c10AL6Nr2KYM4hNhpgW3uU7CHpMT46YsL43TZkMtWgDy5pIhHOObD3MtplpW9i42Jao5V34Bs2YupG3hPZRwADRUBWJo9QvRvltFeCL3t41XHPOfmYAavFCf397kOxAEtcpXnjAGp9b8ND4uiIX2D7A__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
};

// ─── Phone Frame ──────────────────────────────────────────────────────────────
// Modern phone proportions: ~375×812 real device → displayed at 200px wide
// Aspect ratio 9:19.5 → height = width × (19.5/9) ≈ 2.17
function PhoneFrame({ children }: { children: React.ReactNode }) {
  const W = 200; // display width in px
  const CONTENT_H = Math.round(W * (19.5 / 9)) - 48; // subtract notch+bar
  return (
    <div style={{
      width: `${W}px`,
      borderRadius: "28px",
      overflow: "hidden",
      border: "3px solid #2A2A2A",
      background: "#1A1A1A",
      boxShadow: "0 20px 60px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.06)",
      flexShrink: 0,
      position: "relative",
    }}>
      {/* Notch / Dynamic Island */}
      <div style={{ height: "28px", background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {/* Side buttons (decorative) */}
        <div style={{ position: "absolute", left: "-3px", top: "30px", width: "3px", height: "28px", background: "#333", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: "-3px", top: "66px", width: "3px", height: "28px", background: "#333", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", right: "-3px", top: "44px", width: "3px", height: "44px", background: "#333", borderRadius: "0 2px 2px 0" }} />
        {/* Dynamic island pill */}
        <div style={{ width: "72px", height: "14px", borderRadius: "20px", background: "#000" }} />
      </div>
      {/* Screen content */}
      <div style={{ height: `${CONTENT_H}px`, overflow: "hidden", position: "relative", background: "#000" }}>
        {children}
      </div>
      {/* Home indicator bar */}
      <div style={{ height: "20px", background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "60px", height: "4px", borderRadius: "4px", background: "rgba(255,255,255,0.25)" }} />
      </div>
    </div>
  );
}

// ─── Browser Chrome Frame ─────────────────────────────────────────────────────
function BrowserFrame({ children, url = "example.com", height = 220 }: { children: React.ReactNode; url?: string; height?: number }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-200/80" style={{ background: "#fff" }}>
      {/* Chrome bar */}
      <div style={{ height: "28px", background: "#F0F0F0", borderBottom: "1px solid #E0E0E0", display: "flex", alignItems: "center", padding: "0 10px", gap: "6px" }}>
        <div style={{ display: "flex", gap: "4px" }}>
          <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#28C840" }} />
        </div>
        <div style={{ flex: 1, background: "#fff", borderRadius: "4px", height: "16px", display: "flex", alignItems: "center", padding: "0 8px", border: "1px solid #E0E0E0" }}>
          <span style={{ fontSize: "9px", color: "#999", letterSpacing: "0.3px" }}>🔒 {url}</span>
        </div>
      </div>
      {/* Content */}
      <div style={{ height: `${height}px`, overflow: "hidden", position: "relative" }}>
        {children}
      </div>
    </div>
  );
}

// ─── Template Card Composite Preview ─────────────────────────────────────────
// Shows desktop screenshot + phone screenshot side by side
function TemplateCardPreview({ template }: { template: typeof TEMPLATES[0] }) {
  return (
    <div className="relative w-full" style={{ height: "260px", background: "linear-gradient(135deg, #F0F4FF 0%, #F5F0FF 100%)", borderRadius: "12px 12px 0 0", overflow: "hidden", padding: "14px 14px 0" }}>
      {/* Desktop preview — takes most of the space */}
      <div style={{ position: "absolute", left: "12px", top: "12px", right: "100px", bottom: "0" }}>
        <BrowserFrame url={template.domain} height={238}>
          <img
            src={template.images.homeDesktop}
            alt={`${template.name} homepage`}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
          />
        </BrowserFrame>
      </div>
      {/* Phone preview — overlapping bottom-right, scaled down to fit card */}
      <div style={{ position: "absolute", right: "8px", bottom: "0", zIndex: 10, transform: "scale(0.46)", transformOrigin: "bottom right" }}>
        <PhoneFrame>
          <img
            src={template.images.homeMobile}
            alt={`${template.name} mobile`}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
          />
        </PhoneFrame>
      </div>
    </div>
  );
}

// ─── Industries ───────────────────────────────────────────────────────────────
const INDUSTRIES = [
  { id: "all", label: "All Industries", icon: "✦" },
  { id: "restaurant", label: "Restaurants & Cafés", icon: "☕" },
  { id: "beauty", label: "Beauty & Wellness", icon: "✂" },
  { id: "clinic", label: "Clinics & Health", icon: "+" },
  { id: "fitness", label: "Fitness & Sport", icon: "◈" },
  { id: "retail", label: "Retail & Boutique", icon: "◻" },
  { id: "services", label: "Professional Services", icon: "◇" },
];

// ─── Template data ────────────────────────────────────────────────────────────
const TEMPLATES = [
  {
    id: "modern-minimal-bistro",
    industry: "restaurant",
    name: "Modern Minimal Bistro",
    tagline: "Elegant & Upscale",
    tier: "Business",
    tierGradient: "linear-gradient(135deg, #C9A84C, #8B6914)",
    domain: "modernbistro.com",
    palette: ["#1A1A1A", "#C9A84C", "#F5F0E8", "#2A2A2A", "#8B7355"],
    paletteNames: ["Charcoal", "Gold", "Cream", "Dark", "Warm Brown"],
    styleLabel: "Warm Dark",
    features: [
      "Cinematic hero with full-width photo",
      "Signature dishes showcase",
      "Menu page with categories",
      "About / Our Story section",
      "Contact & reservation form",
      "Google Maps embed",
      "WhatsApp & social links",
      "Mobile responsive",
    ],
    pages: [
      { label: "Homepage", preview: "home", description: "Full-width hero, signature dishes grid, and restaurant info bar" },
      { label: "Menu", preview: "menu", description: "Category tabs with dish cards, photos, and pricing" },
      { label: "Contact", preview: "contact", description: "Opening hours, address, Google Maps, and reservation form" },
    ],
    style: "Refined minimal aesthetic with cream backgrounds, gold accents, and charcoal typography. Ideal for upscale bistros, fine dining, and contemporary restaurants.",
    waMessage: "Hi! I'm interested in the Modern Minimal Bistro website template.",
    price: "€350",
    images: CDN.r1,
  },
  {
    id: "sunny-social-cafe",
    industry: "restaurant",
    name: "Sunny Social Café",
    tagline: "Bright & Welcoming",
    tier: "Starter",
    tierGradient: "linear-gradient(135deg, #E8724A, #C8923A)",
    domain: "sunnycafe.com",
    palette: ["#4A3728", "#E8724A", "#FAF6F0", "#C8923A", "#F0E8D8"],
    paletteNames: ["Dark Brown", "Warm Orange", "Cream White", "Golden", "Light Cream"],
    styleLabel: "Warm Light",
    features: [
      "Bright hero with daily specials",
      "Scrollable specials carousel",
      "Instagram feed section",
      "Menu page with categories",
      "Contact & find us page",
      "Order online CTA",
      "WhatsApp & social links",
      "Mobile responsive",
    ],
    pages: [
      { label: "Homepage", preview: "home", description: "Warm hero, daily specials carousel, and Instagram feed" },
      { label: "Menu", preview: "menu", description: "Category tabs with item cards, photos, ratings, and pricing" },
      { label: "Contact", preview: "contact", description: "Opening hours, address, map, and contact form" },
    ],
    style: "Warm, inviting aesthetic with cream backgrounds, orange CTAs, and golden accents. Perfect for cafés, brunch spots, and casual dining.",
    waMessage: "Hi! I'm interested in the Sunny Social Café website template.",
    price: "€250",
    images: CDN.r2,
  },
  {
    id: "roasted-bean",
    industry: "restaurant",
    name: "The Roasted Bean",
    tagline: "Bold & Rustic",
    tier: "Starter",
    tierGradient: "linear-gradient(135deg, #6B4226, #3D2B1A)",
    domain: "roastedbean.com",
    palette: ["#1C1410", "#C8923A", "#F2ECD8", "#6B4226", "#3D2B1A"],
    paletteNames: ["Dark Espresso", "Golden", "Cream", "Warm Brown", "Deep Brown"],
    styleLabel: "Dark Rustic",
    features: [
      "Bold full-screen hero",
      "Category blog-style menu",
      "Craft coffee showcase",
      "About / Our Story section",
      "Contact & find us page",
      "Phone number CTA",
      "WhatsApp & social links",
      "Mobile responsive",
    ],
    pages: [
      { label: "Homepage", preview: "home", description: "Dramatic full-screen hero with bold typography and CTAs" },
      { label: "Menu", preview: "menu", description: "Blog-style menu with large food photography and descriptions" },
      { label: "Contact", preview: "contact", description: "Location, hours, phone CTA, and contact form" },
    ],
    style: "Dark, moody aesthetic with espresso backgrounds, golden highlights, and bold sans-serif typography. Great for specialty coffee shops and artisan roasters.",
    waMessage: "Hi! I'm interested in The Roasted Bean website template.",
    price: "€250",
    images: CDN.r3,
  },
  {
    id: "nonnas-pizza",
    industry: "restaurant",
    name: "Nonna's Pizza",
    tagline: "Rustic Italian",
    tier: "Business",
    tierGradient: "linear-gradient(135deg, #8B1A1A, #3D1F0A)",
    domain: "nonnapizza.com",
    palette: ["#3D1F0A", "#8B1A1A", "#F5EDD0", "#C8923A", "#2A1505"],
    paletteNames: ["Dark Brown", "Deep Red", "Parchment", "Warm Gold", "Espresso"],
    styleLabel: "Rustic Warm",
    features: [
      "Wood-fired pizza hero",
      "Signature pizza showcase",
      "Full menu with pricing",
      "About / Our Story section",
      "Contact & find us page",
      "Order now CTA",
      "WhatsApp & social links",
      "Mobile responsive",
    ],
    pages: [
      { label: "Homepage", preview: "home", description: "Rustic hero with wood-fired oven, signature pizzas, and info" },
      { label: "Menu", preview: "menu", description: "Full pizza menu with photos, descriptions, and pricing" },
      { label: "Contact", preview: "contact", description: "Opening hours, address, social links, and contact form" },
    ],
    style: "Warm rustic Italian aesthetic with parchment backgrounds, deep red accents, and elegant script typography. Perfect for Italian restaurants and pizzerias.",
    waMessage: "Hi! I'm interested in the Nonna's Pizza website template.",
    price: "€350",
    images: CDN.r4,
  },
];

// ─── Modal preview renderer ───────────────────────────────────────────────────
function ModalPreview({ template, page, view }: { template: typeof TEMPLATES[0]; page: string; view: "desktop" | "mobile" }) {
  const imgSrc = view === "mobile"
    ? (page === "home" ? template.images.homeMobile : page === "menu" ? template.images.menuMobile : template.images.contactMobile)
    : (page === "home" ? template.images.homeDesktop : page === "menu" ? template.images.menuDesktop : template.images.contactDesktop);

  if (view === "mobile") {
    return (
      <div className="flex justify-center items-center" style={{ background: "linear-gradient(135deg, #F0F4FF, #F5F0FF)", borderRadius: "12px", padding: "32px 24px", minHeight: "560px" }}>
        <PhoneFrame>
          <img src={imgSrc} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
        </PhoneFrame>
      </div>
    );
  }
  return (
    <BrowserFrame url={template.domain} height={340}>
      <img src={imgSrc} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
    </BrowserFrame>
  );
}

// ─── Template Detail Modal ────────────────────────────────────────────────────
function TemplateModal({ template, onClose }: { template: typeof TEMPLATES[0]; onClose: () => void }) {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [activeView, setActiveView] = useState<"desktop" | "mobile">("desktop");
  const activePage = template.pages[activePageIndex];
  const waUrl = `https://wa.me/972584928177?text=${encodeURIComponent(template.waMessage)}`;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(17,19,21,0.75)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-2xl w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl"
        style={{ border: "1px solid rgba(91,140,255,0.15)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-gray-900">{template.name}</h2>
              <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: template.tierGradient }}>
                {template.tier}
              </span>
            </div>
            <p className="text-gray-500 text-sm">{template.tagline} · {INDUSTRIES.find(i => i.id === template.industry)?.label}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Preview */}
          <div className="lg:col-span-2 space-y-4">
            {/* Page + view selector */}
            <div className="flex flex-wrap gap-2 items-center">
              {template.pages.map((page, i) => (
                <button
                  key={i}
                  onClick={() => setActivePageIndex(i)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activePageIndex === i
                      ? "text-white shadow-md"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                  }`}
                  style={activePageIndex === i ? { background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)" } : {}}
                >
                  {page.label}
                </button>
              ))}
              <div className="ml-auto flex gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveView("desktop")}
                  className={`p-1.5 rounded-md transition-colors ${activeView === "desktop" ? "bg-white text-gray-800 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                  title="Desktop view"
                >
                  <Monitor size={15} />
                </button>
                <button
                  onClick={() => setActiveView("mobile")}
                  className={`p-1.5 rounded-md transition-colors ${activeView === "mobile" ? "bg-white text-gray-800 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                  title="Mobile view"
                >
                  <Smartphone size={15} />
                </button>
              </div>
            </div>

            {/* Preview */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activePageIndex}-${activeView}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <ModalPreview template={template} page={activePage.preview} view={activeView} />
              </motion.div>
            </AnimatePresence>

            <p className="text-gray-500 text-sm leading-relaxed">{activePage.description}</p>

            {/* Colour palette */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-gray-400 text-xs uppercase tracking-widest">Colour Palette</span>
              <div className="flex gap-2">
                {template.palette.map((color, i) => (
                  <div key={color} className="group relative">
                    <div className="w-7 h-7 rounded-full border-2 border-white shadow-md cursor-default" style={{ background: color }} />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {template.paletteNames[i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Details + CTA */}
          <div className="space-y-5">
            {/* Style description */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-gray-600 text-sm leading-relaxed">{template.style}</p>
            </div>

            {/* What's included */}
            <div>
              <h3 className="text-gray-900 font-semibold mb-3 text-sm uppercase tracking-widest">What's Included</h3>
              <ul className="space-y-2">
                {template.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing + CTA */}
            <div className="rounded-xl p-4 border border-gray-200" style={{ background: "linear-gradient(135deg, #F8F9FF, #F5F0FF)" }}>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-gray-900">{template.price}</span>
                <span className="text-gray-500 text-sm">one-time</span>
              </div>
              <p className="text-gray-400 text-xs mb-4">50% upfront · 50% on delivery</p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Get This Template
              </a>
              <p className="text-center text-gray-400 text-xs mt-2">We'll personalise it for your business</p>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
              </div>
              <span className="text-gray-500 text-xs">Loved by 50+ businesses</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Template Card ────────────────────────────────────────────────────────────
function TemplateCard({ template, onClick }: { template: typeof TEMPLATES[0]; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-400"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid rgba(226,229,234,0.8)" }}
      onClick={onClick}
    >
      {/* Composite preview */}
      <div className="relative overflow-hidden">
        <TemplateCardPreview template={template} />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/8 transition-colors duration-300 flex items-center justify-center">
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-gray-900 px-5 py-2.5 rounded-full font-semibold text-sm shadow-xl flex items-center gap-2"
            style={{ transform: "translateY(8px)" }}
          >
            Preview Template <ArrowRight size={14} />
          </motion.div>
        </div>
      </div>

      {/* Card info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-gray-900 font-bold text-lg leading-tight">{template.name}</h3>
            <p className="text-gray-500 text-sm">{template.tagline}</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold text-white flex-shrink-0" style={{ background: template.tierGradient }}>
            {template.tier}
          </span>
        </div>

        {/* Palette */}
        <div className="flex items-center gap-2 mb-4">
          {template.palette.map(color => (
            <div key={color} className="w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ background: color }} />
          ))}
          <span className="text-gray-400 text-xs ml-1">{template.styleLabel}</span>
        </div>

        {/* Feature tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {template.features.slice(0, 3).map(f => (
            <span key={f} className="px-2 py-0.5 bg-gray-100 rounded-md text-gray-500 text-xs">{f}</span>
          ))}
          <span className="px-2 py-0.5 bg-gray-100 rounded-md text-gray-400 text-xs">+{template.features.length - 3} more</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-900 font-bold text-lg">{template.price}</span>
          <button className="flex items-center gap-1.5 text-sm font-semibold transition-colors" style={{ color: "#5B8CFF" }}>
            View Details <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Templates() {
  const [location] = useLocation();
  const [activeIndustry, setActiveIndustry] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<typeof TEMPLATES[0] | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const industry = params.get("industry");
    if (industry && INDUSTRIES.find(i => i.id === industry)) {
      setActiveIndustry(industry);
    }
  }, [location]);

  const filtered = activeIndustry === "all"
    ? TEMPLATES
    : TEMPLATES.filter(t => t.industry === activeIndustry);

  const comingSoon = INDUSTRIES.filter(i => i.id !== "all" && i.id !== "restaurant");

  return (
    <div className="min-h-screen" style={{ background: "#F6F6F4" }}>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(91,140,255,0.06) 0%, transparent 50%, rgba(139,92,255,0.06) 100%)" }} />
        <div className="absolute top-16 left-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(91,140,255,0.08)" }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(139,92,255,0.07)" }} />

        <div className="relative container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#5B8CFF" }}>Website Templates</p>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Find Your Perfect
              <span className="block" style={{ background: "linear-gradient(135deg, #5B8CFF, #6FE3FF, #8B5CFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Website Style
              </span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Browse our curated designs by industry. Each template is fully customised for your business — your logo, your colours, your content.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Industry Filter */}
      <section className="sticky top-16 z-30 py-4" style={{ background: "rgba(246,246,244,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(226,229,234,0.6)" }}>
        <div className="container">
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {INDUSTRIES.map(industry => (
              <button
                key={industry.id}
                onClick={() => setActiveIndustry(industry.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0"
                style={
                  activeIndustry === industry.id
                    ? { background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)", color: "#fff", boxShadow: "0 4px 12px rgba(91,140,255,0.3)" }
                    : { background: "#fff", color: "#6B7280", border: "1px solid #E5E7EB" }
                }
              >
                <span style={{ fontSize: "12px" }}>{industry.icon}</span>
                {industry.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16">
        <div className="container">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtered.map(template => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onClick={() => setSelectedTemplate(template)}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mx-auto mb-6 text-3xl shadow-md border border-gray-100" style={{ fontFamily: "monospace" }}>
                {INDUSTRIES.find(i => i.id === activeIndustry)?.icon}
              </div>
              <h3 className="text-gray-900 text-2xl font-bold mb-3">
                {INDUSTRIES.find(i => i.id === activeIndustry)?.label} Templates
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
                We're crafting beautiful templates for this industry. In the meantime, we can build a completely custom design for your business — just reach out.
              </p>
              <a
                href={`https://wa.me/972584928177?text=${encodeURIComponent(`Hi! I'm interested in a ${INDUSTRIES.find(i => i.id === activeIndustry)?.label} website.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Request a Custom Design
              </a>
            </motion.div>
          )}

          {/* Coming Soon teaser */}
          {(activeIndustry === "all" || activeIndustry === "restaurant") && (
            <div className="mt-16 pt-12 border-t border-gray-200">
              <p className="text-center text-gray-400 text-xs uppercase tracking-widest mb-8">More industries coming soon</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {comingSoon.map(industry => (
                  <button
                    key={industry.id}
                    onClick={() => setActiveIndustry(industry.id)}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 group"
                  >
                    <span className="text-xl text-gray-400 group-hover:text-blue-500 transition-colors">{industry.icon}</span>
                    <span className="text-gray-500 text-xs text-center group-hover:text-gray-700 transition-colors">{industry.label}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">Coming Soon</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20" style={{ borderTop: "1px solid rgba(226,229,234,0.8)" }}>
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Don't see what you're looking for?</h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Every website we build is fully custom. Tell us about your business and we'll design something unique — just for you.
            </p>
            <a
              href="https://wa.me/972584928177?text=Hi!%20I'd%20like%20a%20custom%20website%20design%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)" }}
            >
              Start a Conversation <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <TemplateModal
            template={selectedTemplate}
            onClose={() => setSelectedTemplate(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
