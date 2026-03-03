import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { X, Monitor, Smartphone, Star, ArrowRight, Check, ChevronRight } from "lucide-react";

// ─── CDN URLs — uploaded fresh from project files, all Expires=1804078854+ ───
const CDN = {
  r1: {
    card:           "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/bVUpXINOvCNfbZYl.png?Expires=1804078854&Signature=IyvJRpimQuWMhciOHu-yvF~ReZHYqW4tmk-3UOh9B4DwcWjfNSciMukyuIUsXJdLpOhTy1FhlRhAfUJiNL5JQXoKxfawW2ri9TPNwhH5D96X1kmzWPWKoBtmwNfS7GNrigRoG8uOmcCHRhTE-k7gdPf8e19x4t5oljOreZoJABzSN-eug29IMyT7mOT0rCqvmba0IPKqT2JeLZ4DHXC-KW1y8fZXMwjfy5zwqyxbDzTD5WjfIq97lZaJNzopWbtR~Po2ZmI-3iFWsAlMYRi-J0KRMSvyhdXEOc8Gi~8vi8wZfQ3d8lA757iVBYVig4WCNuL~TOxWUHY~Y0POrKXAuQ__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeDesktop:    "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/VtngwpYgHZaZjoam.jpg?Expires=1804078854&Signature=U19RCXL~nweMFdw1J8CmbrayfItB3gA9MslBnGLpCxqgE2D61gNDSvV05XTfWtq7IHsUlKY~rX4Ss882vNOoLc1-ynXVQXhKdFVZTbC2eATvdJjuZQOaQHUYJhQGM0lxSf06ictDQJlgyhsdtpgMiOrQqagr0T4Esckc0bnkg5R2n~L6ahkzyF1uUddW9UHDIbpRi6NxVDLcsPIPsvH9YE50LmQLoZoRJMzUmxW~5tr0ZUJ4OwiWJhP98PtoZ4bLUKUKTaRKV05JUmLom4atKtl~adWwdLP1yTL2xACmPUf1hl7WdzY6ie-o4sO3sH0ieNFrz-PbdLDgA2DyhAYwFQ__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeMobile:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/KHJMGrXPzgjMqvOb.jpg?Expires=1804078854&Signature=ED9DRMP4kXIS0WRC2sYy4gD2UrB--SoY9QA8i1jmqA~9TZS9TPtRf9C9CaDBUJ5O91e45CM-lTGnVq-neo3D42u~iMoS9pPPDYQqiI7lfL40mkRM0dI6-uXG0WeJXm3tXaqL8~rrunGrSd~9vn949tIraATCJTqhQ725Uq2flHrJ4vcY3iWgp~mCAQQZYzPvYBE2CBuAcCJ~ROlO9rGfb-0ChMaGhCEGpghdLGsIkhMnalAUrgCS7lT1-DEw5PM4Hm2CCi1xbQ5WrXIgR5jJqwRaCCMBs57CWhURxZJvqmp2nbUKAFQuSumnQmrfW8DpjF2OrnW8r2pGg9rogiei9w__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuDesktop:    "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/PsYRZnagsapytlxJ.jpg?Expires=1804078854&Signature=Cn7dpOMPIkHCZdiOwcqG-BlAI~OsHP1D8JWAvetaJMygru38IUGhndRweqGYa5I7aSJIhAsAPGS4P7h76XE5Cs03i7G9lB4FG49Yr6jtb2yS1ZH3P0GRqjnEzJUSkMggcIBeE3VvBjc7YA8CjUvG2U5KOt~-f6w9KAMPHaWETl0yVfzXhRbu4NgCgKX737tKapF49zPHbP0gUmGhZZvWue5dHFsVILPFkceLOOWlwgwYvfA8ieC3dMMDSSVEadAx2gzqB-qpVC78JOOCqSPUfGo86bSTrmMzKl~zhZa0O9G8hetsv4awBfBXhdu3hBUZi~AhvSd0v-5ZFoKOPmkIQg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuMobile:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/EhLcYswtNjSTSbuu.jpg?Expires=1804078854&Signature=CKym5KY0mkh~g5CmSdWZLLsOxtxcu4bEjbC0eXGuFh5cbt3dsasf-lJBwuZYK~Om-pF69V4nANkHMmF-vTLv6OJik2zY0YhHT1ch3n5tge7iKnRy08bDLsO5FtlhRqNMwXA87pFu9a8bbqABxXgq8NfAuJjgbcL7ayfeAcS8O~1Jow5bvlLmr2OnMp8IR0TylUuJSf5kV10mdS~u7R8CX6FU3MwpOVy4WKl7dFJ-DSCRZVuH4YQN34ouE2ChYDDIMliVWt1ATPIAVWLOK237vssIvs9X-R0Ini64OHTn0ZKcgKfsKNRCxy4obuUMGr-jUjg5e5A1lQ4~fyPA9XKgNw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactDesktop: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/eAXUIRNVXwpZTdzU.jpg?Expires=1804078854&Signature=Z1aHwuuaFKn3gDLBNt9eeFXi01ERiAu0qDMpf44ddlrSfo5CMd3E3wc1KYWBEoXny5El1-FipC-mZ4Z8nandfj8rM8WNI8k0Mr7HFKB3KSbxBvnmWZm3cd-nWoRqp-s2OqwQwSTHadCTI5RKQRlLAPvbAVB4V650ZWXlGFhuT-zi15esrAL2MIS-3Sy8zpxQ0zGCmuWpqBqfhbcnin4VjRtDjtUSx8JQH7EUHikaLDNJQnq3fD5VKHlXhC2CASUlcYeKvT3jcJOngwVIYcT62a-ex79twMazNbNQ9u98yXa8oVkhsf58Hc-nusUvvK833qU20cEuL2JBS0Rq6QhARw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactMobile:  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/TkcApTdrRVfvWPRR.jpg?Expires=1804078855&Signature=u-TlHKXh61HEaPOyz9iAXJAWc6znw6YORQfNm9fWt~v6YwlIdK0d6XxKbq-w~~1WL-KcreIPThCqvcxiUnpJNN3jLbgcafdz26rmgkiMWczVapWGsd11vtTDPUYBUN1IGuyfbuIK~WbFOBSoFKK7UO38uzIc8yrtYHItyILHAn9iBRpIKTszOAdFTOD3piYC7hvic1aQ00HzMtSiIshSdR6WUcLwdmigN7SP9SbpCbSbu~8kehteIfG0Xchiak4Z2w8TZN6LGdpW25M07J7X5n5O7aNuOokf1qKcgZDVOj~YGeR91zako6SeSM1vzUjAhz9cLkMesaimZHIHgrd9QA__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
  r2: {
    card:           "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/KKNWdiEkMBAvTaTZ.png?Expires=1804078856&Signature=srU0ID04yyx5aCy1wH3hRxfcIxm08Wmy6YRpEvVnctuA3JLnF0ei3~uExRyW6GDmYtLzUxykekcvm~iKb9UH9Jd5RfeY3ZNDtp9jijh2ZbGHIkpfdpCcl5ELeNSn4lGY96JkRIoz4BOvVsdbUVbgiYvFSOPp0859yl2fOZkTCAA7fjwTDtiLe7OJEnwDj47iG09E0Ph78wtktWh-SZ5PMxeY2V02b-Uw65vSRUP~ckim-UVZ5wP-x4Wq00EACAHei5D8Z1gcoaV3gsL7O8YrtsnPHFjLwTa7F57WIdu0yqKm9Kmqbjjp4LW9g3GEtCUB~T6-rTUdzXtsQoW6YZQkKg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeDesktop:    "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/BqwsuwZUhGSSnlKJ.png?Expires=1804078856&Signature=CGLJxB166R20VPQ~nUt7Qb7fKZRmYp~vETT3lzDevpd7EzK46HvJn4m5J2EtEAUQDK8wUAfU4Rv48a6IvQwRvPMgqMl41msOLd3UYUtAppgppQZHFKGW8oy5bzXOX22ZMeq3mYAZGbTsIJOucQMJYTFuHyHHNety5FDrmhJxaqM2Tizf~wbaQBKZebUyoEacEMU32-hQZtVYiNjHJvyebaFJkJtk24Sd5Mr8xJZgAj9CcMcwgj08ikPpNIIftGkBgcL0osRjETmNyDHdOqe6E8TBp94P78Ln1JufMNfVBw03pIHi1QaIPSNQjeoHS9HPRDwm13f19DlBdP74~9kuuA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeMobile:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/ORgSLgjNirtenlDI.png?Expires=1804078856&Signature=vi8Fa5mrPOAjlbvn71LvPvuPpH8yjEwWHJ6KVjo~l8ociAcNcYPL1zfqhFkcEyDqMgpyHZy8-0Cjm6MhFPdbEip4nAZ4MxJYrnt9Qp-7~GVpcOs41XJ43wZDqNzgyVXXyvSXeupIbBFPdP7XF7n1pKRicDPQXZnk7DmlzAUFxy1yql7drePDNyjgCULgzULXMBkMUGZ-R~Mi2~KSLGBiHKNrdT8ofrWMKtY0oI6KYSMYDb9qrl-EAJckaBa8dPLKN2iHJV70RcRKM7XTjFMCeuckcxnTz8N8VELoBHYBusOaFNrPLMXGLRHF5NPfHVCYu-UwCO2AnsneJJuQcXdy0g__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuDesktop:    "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/GnocRQwNhvNmiedX.jpg?Expires=1804078856&Signature=Pf434Z~vM61FZZBUujC8VryOHS2w496Z9YShVOf6KCfCZ40FK3Iw~A83xzfTsxhuROeMkDnXaYxRmrWmQ74dVPaq7239sgUlFyzqbvY~YXVFShQvfnsxtoUSFe5tPQrU~3GSdaKLmSHSfLFSlp~03wwEaSqa3YXpwGsicHV3bhssPAWl0EpXSczBPq2V9bCUrm~XXV87FO3wf8GkwBM04MaKdxAur4p1P3ojZUC04a491ePpzBQuD4s6xCNjuSqfl3yLsLlyNAQc8XcNPiBy~yuZf5VBT4nxli6ZjGyuUq7ByglO0tiTI8F5I2Bx3igm62kdQdpzKbjOGSZ9NhoO~A__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuMobile:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/MCXsnfkNvhLLiBaq.jpg?Expires=1804078856&Signature=gIEpoPLoXRHq1twX7ue4u-eIOdttdPNFSsBCaEkwtXLi7cetCDSSt~JId0l~bmm2V25GakwxUM1ndHL5cbM3YpD7tSVj1fvzVQl1YipI6wCUrtO-v2MBKVkdGQugmwLUe9TKG0NcJfQXlUsRZ06TjmE0g~X7a4C9dzCPajP4uGZyE8BMhw-WTy6KQ9TuQ28GX1~z198FiowxB6Pegdg0g2nMIQ6OgC3jTB5i2WAmgKF2O9BJzZOsS8UP9HNVAVtxivhloF4PKIC6U0ngZ7wK1eVuoS9HbiPnE0Hn5-Ai4nrA~kWi-maHwKJAUPM8~0xUKLlMol22edGd2YDPVqexxA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactDesktop: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/ekkGPDidQhJwwipa.png?Expires=1804078856&Signature=AZEXFWgaibA84G1r0mpyEYUmwiIFTElMigiZE6mwq3OaKi-qZg9NGGgdPg-VL4UaVatB1wkHUk1WmfR1-4PqJ~W3YKsCF81g9-BRcpadlkw6L1T9S91znrn4OVLLUJp4HoIFi3QOY3xUOJF-Bi1m2VMZejeuniigs0SXHahQioCDyOsmm5Opf4ul6b0Eo~5frjjvgbvnbziDOSi7PH7HyWo37H-WD9lB7vzezRtVgqRKCLrOfweVW0HICrOXXcCBq16TgjlB5POGPkcg7c8FOmZPWgcoYZZjnPTJ5iWLCaX6s3qd2S0xNvWx~qyk7mxJo9Vh9-Qr7CuOtlIsoFl5Zw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactMobile:  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/mbJKkqJnzHLFNmAA.png?Expires=1804078856&Signature=nMpjL~gRH7-4EI6dTDfpybWTxUHSxwcr3t5T6cfaiIYDuMtCmsZ3~EtkEE4abOncw7JQ6jz810S2bmOfNg~D3gu-k1RPEkK5SbyX9nycTZRFW24NFEkxurJ2hk0YSYuKi1NnSWqdZbArvMU4We8MRq2HfUe-QavVVf5Dlvoa3uaAuurasA7nDlPaNKr5U7qLdNSoX5isQg96DD2C4QkTHhgJluvb8I3Gsx7qJmkOy2bC4bmdjZythEApvQvur2GkD09LadYQXCp-M4uG5nubJHr~Af7MMq74rd3GiNr1CPHTj2bo9CWc14Fc23kVxVlRxddXeJ9JdENbSUfBZS1Ftg__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
  r3: {
    card:           "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/cJYeFYaGQoWYFZDB.png?Expires=1804078857&Signature=LLIFbcmhstdZYE50k9IFMrfiehhechivNc6e6JO9cXyrXLIlLwYceAC8A9mBQKXjTQ3iQSE9s4njppJLVaRLByqcdhJiT-QxixHqPMRrFdAcc4-Sc0OYBzn6fpU5XD17cZ8qZOf-wB22BbEg-khd0bNY67fJtzOUId1gLfQTVQ6VSJMSigjqeDsMx9gU4xZWBGhB-OYw3zqCfm1Sk9nWJEKaJoiZLEMfl46M~UmmNfwVyLBTB8teC-Is8zEgVysQ~WmCPZgIM75zgpRAli9Z0bamREAd8DF-poWP5fzoKAlwv7pBrjLDJil168fFLLN1kC4Pxfm9Bvn3s8BJQVG0lA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeDesktop:    "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/vwHHkQqnupyZVzgG.jpg?Expires=1804078857&Signature=OaMhfbyFzbbnyYTqShaesnbirSpJwKsFO45LwIiBsuHSQ4RCr2hF702hwVhl4hbdVS8bwoEkkzBQZScpK6vGTYBvr5ETlg0Up5KSW~hAtkDCUMviIgO42N0g-~ARe00Ulm~4SZhmTwry7pJrr1ty5Ulx2ViFzGw74uUW4Lz2meAXtSkVkifYlaOEXWRwFLHkfMh2bAHoif4b0HmsZGM4tbrvh4PivjYcCnxGW3K7qOyDDs4C75JiAQPxXGNOOuqqeayq-ar7UxP5cmoxCiDFZqmbFgFlXr~buCKW0nhIrh0-f3mu76flf1NEGHCcmaNFXROAqCvwgX4241~yfuGoqA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeMobile:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/bFVYzNhGpvymJZPz.jpg?Expires=1804078857&Signature=Co5001aFdv4z5as6Ve0LJ9-CzU0a~XIE3EtU9B5Hpkw789~AwE~FGKORyZsLwO2yXdGC-Nwnn-KzpRsQSYdFRWsuKaCdAkAHRaBNf~HFUbfcKaobTISwAO8YC23I0E86H0BKat6apQjYnLwfsGxDhLmW6wdFvrRDLwFjQTB6rHdRtpv5BLo1~gD7YnosYfTHav8KPYvKj-9VfMn96ZTjM-15LrgACNyIJozJIcI01vfXdNzw~qJPNc1p6IbwLsxXicPaGLewnc3UIM32mvmUHSJvyk7tiGqDSlnohp4dIt6FDkxqJp6wJrRd2kiWWX3fLk9lECOLiUR8BQDlsDr4aw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuDesktop:    "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/lQsJWBXexktbSwJW.jpg?Expires=1804078857&Signature=QNGx9-zZthoRTt6eJExZS6OhqjOI7IHwBjIiOPOnavFUObEmJo~e6DfRjaaLY0TotBqeqqm1YuH9popB5BZwrWP7SKiCO6oHra5F4m7w4TXy9jPKrjuMJCqor9megmH0H~1KToSAnjWjSXCCDhUAS90fLeisqQOztRwX~PnkDp20NzayibkcvbcZIV-7Uu94a7ekikIiBrLWc3TqGqSKTQ7q22VyJ7v4M~YfGQIp41y-RYqMTDWTTUx7JhTwnpiNaCsMd8PqrkvxGaLA8XuB2FwGHCHTPwUOJ3nw72Z-xHrN26LfUtObX3ht7NG4OPfkzvPcRfjGob1Ct-ZymHD3hg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuMobile:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/kDMfGEBGnTeDzfvy.jpg?Expires=1804078857&Signature=ZSIe4mYZeoBNqi~3AjmKZFuXxvgYyDqeP7cJXOqMN7aP01QtZF0oR2aQEhxdX1f70nJxK3YhMuvZacvcMbur3uG3uVTOg8oo~7yUsOFlwGmdmYjFGf9zJa93b0IgspzAB87a4iqt-QTQWYOh2skLKS9Z7cTezExBzAzyE-DDmsW~CwuUlTFwCtJV2PXXFBFkUw6dhkEsZjnaKMfszS~l73Ri11~rM~NbCv19xrNx2WzK7Qa-g~2lxsroHSDISoVO2l~38rOR24NbiH~1qTRfg1OqPQnGjFwAXSugx~UnrsDy7I~hqoKWC1w3-aIjwi5HcI2JY1Qw~9HEehbs3eDMhA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactDesktop: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/vwurxfnwYKDEcaHv.jpg?Expires=1804078857&Signature=XpqgNcAJg-sdR8IohToIyykL~kavy6X95xG8nVix6BS1XgIpGt9hJYLcPYIT4dfEYOpUJhTRelUbcr7ULF-EUZlLNehGJz9AyvnxxGQYQeYFBlJsyX5BKKcQYG-DM0pwPXlWi4KX1onB~~TP0q8B8mF9PBmC07uWR7Qt~8HhvJM5io3EsY~zQYK6BHAOX6H9CMXWYKhYIfkNu~j7BMJXpquZdcOE3CH7XC~0U4-HQAKcbuAwj4UcOzKNUzZs5L5nzEJs-aCQ0RFTwvykbpST0WZfhshDUCEDKy2cDuz5yPnpqYAR1Qa11Rn1XQPiYhOxQXfaHegZGR80npPUxJ4MBA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactMobile:  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/lumWehNChsFpFJdJ.jpg?Expires=1804078858&Signature=eCFtn0G8WeYImLvD89DLBnXfy9olbdtbZmdc1ST89heZkzhlEjTs1sYa3oztvNR8fhYFf-Yq0DoeFuRAccp-38yVXYRlhFbV4~ZpId0fzcMz~GeWfzzfzxyjXpSFYhkbgyujQGpqwj7Yodm4Z01V78PGWfbdGWHTOMzclx3bePuNUldFkz962lmfJzVrT2UaSejX1fKw4-~9oxksFYp6LrJgah2LFHy7~QR4iUtysGxcEE86q2S-TYLcI0YtpwyjBDEGreMu4Ma8zXQwuNwXxFJBFuohafy4HkjaGHe~Ig9Hq5Y2Xh1y9XcCSy1Gib5~X0t3~lgup85ss8BbsGaDEA__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
  r4: {
    card:           "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/BcLwasDaPBWVNlFd.png?Expires=1804078858&Signature=b0adIdLXrhf-s6dVDr-MgMJVtmElMadDdH7HsFgKXNmfGixZH13VXZdkwejm37rhl~bMl0DP37L4tTvZ8~0k0romV1s0JhwG4iQBVfHMsINrfw5bV39IKTtzzi7ZmWL0~RKQ2-JZb1b1DjvtMHhLa-UAvSSnzzUZ-zIFJ3VAbQqlGL3PZODpuuM4ZozJF9hL8LKthWOxDO8UGTjtQIMB~cjZ6q0KWv-ClQjhHLuY7xDwRAWmryfVlpBlb2orS4Jl5Vau~0GE4M8HPvSqvNSBBQMQsCQQyLiFGPIcUG8oquj-lITTJERbMaecGLyJyt0RiDjlM7f-lPw7EHEArSA1XQ__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeDesktop:    "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/KUwuBuyNuyIMeRIZ.jpg?Expires=1804078858&Signature=abDeVGJejEqVCzEzAiA2yDHRFkdLZb8gs45ARD2hRnxFHHrifaolIAYFN4ZiaFR0-JHXDmv1iWZ7vUCii1PZ~h08L3ivM3x2I9Zhyzo4rQC0Uy8WLMUUghp8tfyHZWAqt128W2Uf73z~6Dfs-UuLkeLYs3IT8BCK9MR8R6DVWUN57FqKX1wVSuQLajieZNYwVVwo6jdg3EOuBlrOdB7a6UyiBeLnLL5JkqmJwxyDF9Nw6~iBcUrMXjiA9XXH-rnWw4-2~r276gZdlE7XPBbQjLxan5xPHmwWlVEpG4rcrfgMT~MCBY5GmijO1gHlz4-HiQYl5sjwYguBrM52AS6tjg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeMobile:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/kZZVxOYNdQGgdlmj.jpg?Expires=1804078858&Signature=G91TEY-zwXUj5ctrctLR-pl0Xk4Vli914EqMRNlwRgs2ARA75zEKlyRiUsmpG01u9BRW9lArtUx2F1-tY6nXUiQCUEmRLLIFeJxNKoMBPOeoug80X66xdVP-Vh~355kpmyKuFOyvZFtopTBiOloGWrBowT-NLeYBYcXF2Uu7F2DQSWEVxGw0hLgqRUXixI565GXm3OHSQALlN56D115jKoabXfx13lVUWELkmtidwz0~efsVHTn~xOfrBy5zCNaaiIcyL~KAmUATV9Mu828ls7BJg7F8LvzGpqcUBsGrCscQfGjnM9ofy2UvOaiMAOqnqsOyAS7acv9tz4Bypaq~TQ__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuDesktop:    "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/nsllMcLQGLdIkBeR.jpg?Expires=1804078858&Signature=NAw3yQsmxfv2HPkW7Umoe0cGqu2c9O3vv1jWM4YKhMZLubWpeSsEn~8SIQAqE7g5bjV5O1RSXHGlA6x5SzJ2droW1w4u7QoS1ZpGsZ1YM-o8jMTgiNKWbLk3RFIgzOr6jgaoJx81nejxpDfjXZFeuhmZgusq1S7-mhhbOR5LUx6k6XsXSa4fn7tKVQtnJZUEK9t90b1nn12VRZ7OBHF52K~9z8~ocxTDZnrJkRLT~93WVGIrH0mhZBVdhkCu-SXfwPrLvIe0zFjfjyua6IPTZi7T~ia9KWvkJPLoqLQa2qjlHHlt4yDN~XVCK2Ly50ei7Bhua8z9UvBA1vAdwjum9g__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuMobile:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/XpYfyZWiNaGgSAld.jpg?Expires=1804078858&Signature=iQSImXzyhlhtfJ~Xv68X4ogVDKw4lih6LX30N423nm74tMbBOPmkD86DsDidIBO1gihCXQFL~NYhzoIOHKjr2ftsTgoc3TpTnqw3sZMnzG7QZLyo6ho02bbTimv~2AvDyjFouZN-vQrZnPfzyVTDBu1uewqo3Kcx3pj~ITX7RpDPw9NxIx60NTNaMxIOQLZz8xiO8gGFl9rha~VUPqIkuaKxEU8VHyqhHJu8JIWXzKcHZny4KJdXAYvSq69bz8qI-Xau9hHSrDEZrqwDKa~bU0dJaSsM7S9lbH1sa36SfVZynJUpusXy37Gd3JJeholO0~xIBcs4Y3~dud08G0B6Gw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactDesktop: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/bqAmhulgXHrsFpEQ.jpg?Expires=1804078858&Signature=FOwYXYzAKFeJzZjovxlYhOQkkpfTjBzABxBrAYKi5J2Af8zrdt1BpP22cxQRnvURqazMPXDEF9n3c61gmwM0CITjhl8tbcz8GUa2442qu-loLieANnLTJX9bXd-8mw61sjYet2a4k6B4TG7bNIKznbwD80Lg-x2ggzKqcX1un-dlmBeRLslq9A3AjExPHLgzU0eMJF5L00iWTj67kHz8hrNzbbhI2hfEaGNJPqY3gN8AcoKC5getdIpLYpdcBA4WUcyHqQqB4LV6BKOLpASbx4xvvOS-RbwzZadufso1EobtNbndwI2UXREzTDrBUwd4PhKk-gc8fsby0--QsieB5g__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactMobile:  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/UmGxiRfKeAxTvAOT.jpg?Expires=1804078859&Signature=QZF25TwQT5-N4CCJiT1ObFy5nivA44zh2FHh1eN-arBK4GtDB5EfDXVPiMA8ILf4udnWwJqHUO-8e3yTDeP0mo1gA6vmzT6l0MayklQkDxvFgJr6MHD66Za3JfLu-gb~tvs5xdPciKxI4R3rbQoQTpCpx3dCbGYo89UOQiJyvOodN9Gaxn2pWe7-u~oAf9T4CKKkbJE0u0w3bmrKfobgE1yPcplqpabxj-5wWLD2BzATfCRrzEfO0v6qPt51ixKBQtywkurBUhQ88FHFLK7NMg3FUgKxl3wE4ETJvPASuL5JjWlZlA2bFPz0Xra-5HKHYslYoBI-kTD9NTiPyHfHQw__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
};


// ─── Phone Frame ──────────────────────────────────────────────────────────────
function PhoneFrame({ children }: { children: React.ReactNode }) {
  const W = 200;
  const CONTENT_H = Math.round(W * (19.5 / 9)) - 48;
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
      <div style={{ height: "28px", background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <div style={{ position: "absolute", left: "-3px", top: "30px", width: "3px", height: "28px", background: "#333", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: "-3px", top: "66px", width: "3px", height: "28px", background: "#333", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", right: "-3px", top: "44px", width: "3px", height: "44px", background: "#333", borderRadius: "0 2px 2px 0" }} />
        <div style={{ width: "72px", height: "14px", borderRadius: "20px", background: "#000" }} />
      </div>
      <div style={{ height: `${CONTENT_H}px`, overflow: "hidden", position: "relative", background: "#fff", padding: "6px 4px" }}>
        {children}
      </div>
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
      <div style={{ height: `${height}px`, overflow: "hidden", position: "relative" }}>
        {children}
      </div>
    </div>
  );
}

// ─── Template Card Preview ────────────────────────────────────────────────────
// Shows the product_card image with padding so nothing is cropped
function TemplateCardPreview({ template }: { template: typeof TEMPLATES[0] }) {
  return (
    <div
      className="relative w-full"
      style={{
        height: "280px",
        borderRadius: "12px 12px 0 0",
        overflow: "hidden",
        background: "#e8eaf0",
        padding: "16px 16px 0",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <img
        src={template.images.card}
        alt={`${template.name} preview`}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          objectPosition: "center top",
          borderRadius: "6px 6px 0 0",
        }}
      />
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
      <div className="flex justify-center items-center" style={{ background: "linear-gradient(135deg, #F0F4FF, #F5F0FF)", borderRadius: "12px", padding: "24px 16px", minHeight: "560px" }}>
        <img
          src={imgSrc}
          alt=""
          style={{ maxWidth: "100%", maxHeight: "520px", objectFit: "contain", borderRadius: "8px", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
        />
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
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-gray-600 text-sm leading-relaxed">{template.style}</p>
            </div>

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
      <div className="relative overflow-hidden">
        <TemplateCardPreview template={template} />
        <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/8 transition-colors duration-300 flex items-center justify-center">
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-gray-900 px-5 py-2.5 rounded-full font-semibold text-sm shadow-xl flex items-center gap-2"
            style={{ transform: "translateY(8px)" }}
          >
            Preview Template <ArrowRight size={14} />
          </motion.div>
        </div>
      </div>

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

        <div className="flex items-center gap-2 mb-4">
          {template.palette.map(color => (
            <div key={color} className="w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ background: color }} />
          ))}
          <span className="text-gray-400 text-xs ml-1">{template.styleLabel}</span>
        </div>

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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
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
                <TemplateCard key={template.id} template={template} onClick={() => setSelectedTemplate(template)} />
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
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
          <TemplateModal template={selectedTemplate} onClose={() => setSelectedTemplate(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
