import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { X, Monitor, Smartphone, Star, ArrowRight, Check, ChevronRight } from "lucide-react";

// ─── CDN URLs — all fresh uploads Expires=1804155913+ ───────────────────────
const CDN = {
  r1: {
    card:           "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/UOnSAZrlsOnIfDWm.png?Expires=1804155913&Signature=eps9pTRUQcYczGwpElCjc0kYg3H~Jci0R8Ni-i8Fadd234K0yX4zqNPoDQHdXZ3TkqYMvqYeHNI428ZruRGbkJmJ9uAMRksrzb1T3TJVjSWVcZ5hccy3J9CfVETY0-gl9sjeAniVjr48AecY3y8ZrLRDk1GtKhp5AhvAQ7TVy5SKj5sFWkFhZS~o~yiMWeTCn0POlN6Pw49wPhkj0AtsbhOjnhkePsPQ78ivahMYdtbmUnsQ9IRJq0Z41D~WxB8Le~Qqy0K4i5iqwUj53MAalljgbrMMtG5dssO0dqKEK2voMTfTHcCfzUQhl6jFnIjDviF6TR5i3FD1NIKk3GscBA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeDesktop:    "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/SEvpeppetOfwJJNB.jpg?Expires=1804155913&Signature=KXrwphY4Fw~r9Bk7Zs8i37Ce55Iw0mPtckY6J5hZ0RqlUqH6LR~FmtOKk~wi~smPP0~B5za4IMewKWgwZHTPAku7UI430Ec9bmUzNwjnqj3Ae1NtaSZ6bX7g8IZlpa6GWuJDpdzFVz~hgTrgvAdvpocTPgOh1ixP8vEfEgmXJYd5U9ZqaOnmePQEHVmMMkULSRHHz8qmQqfuHLWNLEjVurBVZ6RyztQ8yTSbcnvPaa8b8ARPt78nx8qCE8sH4wtzvlTGI-EZR~48wJy3o4d4lMl0tmak1qBtkY58uGQBLcD8IfCDYb9y1u-W0J7jRBKQfqrh62DV64g04Pm~-knvTg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeMobile:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/UrnWckquAWyhaYFT.png?Expires=1804155913&Signature=bcydXLYmX48ZmzCdjjGweeosRBRl9wzpqsQFZgIhGwJlhhvRzb9IqsJIzfZfO9WvHSdP-MJ1yCvDN0GKGcgTkD6ZbeN0ZiESXxLod-M42kQEwTMOswVLkwR4IE7qsSF-LRXydTcAHLm2EtBXMXK7mXXEFe5WCA3ruvjJH8KIJLjM4Jt4wBspdB7DZnbWzdP7OBwppWJCFhmxkZuIBEeBTI5nk0F57s~rb4IlACCtAGbkoVwl9hJZx62KTCorc1X1Ccu5EOdHJDHL1V0xfP6Om1la8CXvfx9rdnF6GtPR7iZ-GlxqURcbHFURtSxsxKW94jiJYEFXBH~3xo0heKVeXw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuDesktop:    "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/NXilbOFPBvEaQoFY.jpg?Expires=1804155913&Signature=cduveliCeldtFfHA65MlraV-fN5JseRHhmzkhYkZ4UmOz96~QlBYmAwBM06ea5m8CDEsdGxGOaefmCiiI8Q0tsIOJetuaj0ZWqzpBevgoT-tl4yCcMj-K3StGa66E3~kLNVkeg09uapmYFtq5Ou2V4XAlS~Thkz6C5v7NNF5NQ5ugOzOzNmVBR01yAAw926~gRXc1~kgc8b8ZsQU25NVI0vfMSbcLtLCRN7QOV0DTANoF8gk2L1rqoz7bI~XODt3MyBmpznkBoGfXBf36-pNoo3cry5MwUV1Rtf5ExGhRfskLFIz1pgOdHuMILh1LASNwB2qSUSgGDFwOwWl9Jc9fQ__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuMobile:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/eRFisuQAOenLYaQC.jpg?Expires=1804155914&Signature=CJQs6zIM7x8ys2DaQMHXUPQOUNV-Odyv5k0zMfu1HiE19kH0yIhu4Q9YicXz41W~mGPR03lbUIG42-oEIT7lIVrW7VtgtA-hlg6Z3lPt9-oTHV6Hkkr3JhO8CPcd4572wErox6gsrBYryNLUnJ95eJBw7lVPaiDqGd49~0hPA-Jo~pc7MIrCGJWLcUPqb1QC5VvBDJzKCu-zgh0jokGM-wd296CLSXRKu1xWTLz6vYcU0GNjUOMeXeNqLQC2mywTqUalVDHE4J2pOYblulJPTyir27D2ES9gY5n32vPRlRhxayTxJM2uIhutSfUCgJwXxzsgNIU1SeOA9J~H0SE6Zg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactDesktop: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/PqhWypJjcbMmteom.jpg?Expires=1804155914&Signature=e3c541XeUmQGtmg4J-OG743~3PaaMu~IRUAUjeqQO9JebrcGBJS2i5MPgJysj0kYJPF6m4uZadPOUp50X9QS18B8sS8W2bdiuFoAIG6c~QNaLOFGf7yo~~hqFTwnA1aedpNDP4NR0JXn8CrnowxKZuNFcE5Yl2p1hI1qkjJBr2lBJg5twd8nSy-iL1KY5E5Xr8UD2lJlswh4zwF0L8Kwqzt5T9viLd92aH7YPSiHKiOy9IbxlNKurHgfb2QQM8vgR0h0-adQTviv~tuFoaEn0yuNXARJr5Raj1p71v1AtCvEMwl1PXwVTotqwy7v6PxO7RXH7-EMHFrnwInFBquN6A__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactMobile:  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/KoGromdjtZavrFsa.png?Expires=1804155914&Signature=V~JmYSB7K-vWudbvsDpWkKbjVPc6lX9Gv7d3kZ~ViGJO5dwyVTfxS7I2dbzzdFKXDtrFmckPUDjgU5PiUj8YoxMuYQtyZlqkVdqibN5xRGsPlfHxeY-uZ2oW7XVnHRMYVj29XqeCG~LXdxYIGOysFXrhNck0Q8edQEfLk6d~bK0lwVcmogv8N6foD9NrtDwanV1YUV2CMVRZMucmEc3h3NPGcV33lChyiKL-kZShBGu5sM53xsxjw5BVD8~-Iqy9TT5iA97QHnrILBTEyXreHEdWtoXB2Ed4XUvXtNPdCzXTPpVAXvBqSyAsztRmu86lvjII8~VDysw0VKVQEaBsVw__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
  r2: {
    card:           "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/kmUffrELzBPBtqPl.png?Expires=1804155914&Signature=qR1p78argEAJD9mDpdqBYxDvp-2eZzVQYsRg~0MUssFy588LkwyeuiZA7V6a8c3q-q6AsK8FU85WJo1dW7V-4~nCX-uMSg94Nv9VVyf~pBBh0hg5bhvhqofSu31xiq8lgbtPdvkwTflbQ1x1anAXMll6ImwHesZPgKwEc-o6Ob2nPVH~ktrwPG-lzrJD2uqvYwoikoBRpyDjvI9AYjfAluA~2Z-2eWn5WIqaKM2hNU8i19lN1VrKha59OA0b3kabnAEW1auDRDxY1hAlwOaub1cakemdMsFw3lZt5UWjodisCnBfzEurkuwsFv6MIQUhLgnhF6FHQbBzrFYtHcb9sA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeDesktop:    "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/XwykHFJRTqKzfIao.png?Expires=1804155914&Signature=BK3V1Yrx~gCGVwL~DpM0IrBbXiPmPC1pyPuKiEwUGqV-TW3EvhQYQjiVVFeWb6iUgzcxDqvg7UFa~Zw3l5pOcuIHgBVbgZyMVkeHDoNr1bq1T5D7qGzyQNEQJrRsKsJ2oWC34Dlx2jv-PXElq1o7iPXAlNdkHXk9EH-GWEWLPAG3eIUoryFDjSPZFx5bSx4MdEAVpFe8ioVYgt06b4daKibDoRAndilJs58V9hYHrtCwpB3LnFYH--3QnTbNV9nPByI9s3GVz9VN2L8f4UWUii7EyD9fmj2Y3wQB30~mjgukfc~49sQZ2QGenB3KJO86~f3IZR2GFZWPe~A6QA-tiw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeMobile:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/JxsFjnNbHPncpuMc.jpg?Expires=1804155914&Signature=mWc-M5dWCIlG4ltwK2YqxHaznpriAhKGo6FK78gJFH-8H~b5YfV-fPMMRGZlR3A6gUDiVbybIF2P7MEKsmoIESbx4UwvzzfEhjDS7VduH7KbCpfbSsnJgnnfbrW0fogmfe20U5hUSJHFX78RtwENCBW-4RgmbB9SRtwvb1EONSGGCooD753kMiwkxcdRb3GzVQDzUMjg1l6uH~lZ15WMiiYcZVkPJp5PX~A4TgzRHG08jyLBquv9IpBoeYqS7GbBNMthozSgZzeZOEPmbSYxECwUxk7dkUZXNJX4Qbq4pJVBwRUIJWyrT738yl3aOvQDA7YQ7vMZiKf6lDzxPY6ihg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuDesktop:    "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/TwiwcDHHgIBYPeqN.jpg?Expires=1804155915&Signature=KeRQNMsqX~gAN00X2mO1~KzxtHV36Eja1-hUbcFr--x8kx85jxtYsh6ILHukj3T9j4lwhL--yOECklLGo~vzexZY357oHwFdNbe1TFoh8-MisBmmDv3TV93Uo-l9fU1Y5u2yIaJEXSGW0wdz6yYcNDjN~wkF5TRk5gcAekpIbHMDRUSKhOgMPv0fcbbuKBb9YN-vWL3wVOJakNtkJlhtNe11OGG-8QLYHfzvUNIoAyKU6YxIalHxOsJqgN3Rkwc2QA7SReAmbmI8UMLoeJ7645n2J1EVVX4hexz-ZTtVFjzDD5rjc~w~OIXoO6Zj1Bs2btQUpl-2z8RTalLe-sqG7w__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuMobile:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/BUmUKPVIOtNORQZN.jpg?Expires=1804155915&Signature=Y6oxDNxGF5sxPwykEUu7B3ruV8vuXCj0jTyAb6f2XmtDbt-11xoHMywHLiGN8A4Xijfy3YkACg4CQHK5DPLoO1AcM8wuj220UK6yyONqh4YpJRrXjLKQ12lZ~rw7H5OwagPTspOyalxc2QPgpeb~9MOuQNlljEgMlsmoEEv9HwrKKOZueYEGQKnWM~NYP087n03G8RIznkP3fnuehwgTexfML7SuXofcuEmxFiAzfnCil4Zrr7~ljxikb2hnfUNXU9Wh3uXncYM~tyeE4F2ZkagItL6Dg-MVKqueJ6XxAr1ygtS5Aq0p7FLjdNu5UkGxMTIBCuojjx4Kg0n3AibBMw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactDesktop: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/aVNdgLFQXQnPTMsI.png?Expires=1804155915&Signature=Fjl6ZOQ0e1SJZhSvOWjTWntKjB7-Aq1xGWOhBfXPlNOCBaOcjreH-hcDYFIJK-VUEuApobXbgLnk-nfOI81t46-MPjxv8Aax0pdmZOBcAHuk0MGC-grlhyKZaxOq1hMNPeFpc6VxUV6X~yol3ie45hbhvEM-13e41Itc2fcppdXAhb6U4faV6GstHhqRKzj2xq6zk1d0jGAgEthfhCnJd-kFTjyrSapJHQJQgU4TWHECokEOEM0IawIWr~NMkEgWGwHNe3paftnF3mmLzxfRr8P~KCJllT8a~-MyhkmidGM8zCYRaayIb09w~J0FJCcv6W6TfeTj9if8csbb3rYcmw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactMobile:  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/cKshlliQtDXUdcGl.jpg?Expires=1804155915&Signature=aZD5LjnFEQfPuM4aVfN7tOP4048m9211ecD~DR5BTvjJZB7Hpsw7-6folkJg9Cv9w2nCUDAD8FRRkT6ISQfzv87yBQJrW2dGxsaLf2UJBUEnl0td1-aCBLbAEtJ5eWQCXdLBllGaC3dsL3MDvw-IZOmIt2hfuZ4OxlWbNOyYAN8cF7c41ly7ntScV8dqPmiEf26Aec7KLbBMl7ms773j43OqccouyPqNrHcdp1vtlDBwCYWCJI8SyIcOPFnZv65FmpHr8KYozGfaVsuWbnrb1G8ZpDuoukZIWCHGSAmDc43mr~w02~Q2IQOBALqU~VMRjMEoVI~VaA529gmK6DyVgA__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
  r3: {
    card:           "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/IsbrZZbpHbUmLwwu.png?Expires=1804155915&Signature=VAtqVQPI01UfXjhKux1~6ua6tvKVsIKAFNJkox1H-Bn~8G-NSyBSWkfv9-KwBHfFiFObRq5CCsZzs1mDDR9abdiboza2o4Wc5r5x4dWO4xJgrOskraogRf5dPR5ICnKp3CIXiePDdVoTkzXvc4j0DoAnMe9RYq4b5TuXQGs9HeZEUIXVOL1PSgiziO30kcJWkISuZhidVxTO3CZgxo8o4TfJKAY65fpZC3A~27BHMi7mAwXnD09xXAXyutxsM7fPJ6oI-hCruJrbIvOeavADpFvohRZ523MxRlkT5FujU0K2gSdYVhHbjABaAh-29eCByAYyHrbtCxHAPgE3y8mCUA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeDesktop:    "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/bdoBTsSWArOeQriA.jpg?Expires=1804155915&Signature=s2gkvrZ5fE7mo5PhhEvZB3BnFJity~tfrmxr5j6d1tNYzRVrl1JMR9xzWYqIyZhl43ZldJbrF~TrrY0F87Iymsi~IgMt7~JG6~S-kK5bOdOO~wNgkD0g1-e1qVPBWfoFWuE37OcB70gKn2oW-~D1IBFWQmZlDzpvs4bP5wwH5CFzfj1L~ZDUTaR1DnKx4tHdPh7U921vQGHm5Sv35wgTIOoOQc~K26ptNqSoaALh60YravMh199Jq9SyO3qBx4UyBqb1Sfbn4xdiXvzifnztH2rggv5aGD4Oc75Xp19TlOUrllnPiKstH2ziwM1bt~h8l~BCvHLBf3Jym3CSbzaSCw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeMobile:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/TSUSpDNrnIFxCiKW.jpg?Expires=1804155915&Signature=tZGSKTYhc9cBBuWBg5HvVuXPE2FN4eJ4U9ZrhwPkhUqxO27P17b93WUDMGwmf7FlFFjNZvvzuq1NwExqkQSAFGCAveviNGHxFcPa~VCjOk9HjXBLSjh26Hru6HHt9pT2huwtfwikWxDqj3zp9wR8clHSYftFwtu1asQfgilG2CY6JldyoKw0dmYkOrUa8bhYCGyAyB17f-n-HArxYau4Ya8S03xcgCavRZOEJXjlhoA1prmyuTggYbOrgNec0DgEheZEE7eoDSSVFKp1FrLpQUvEPKIic4oDZmqPuIJbr5aminSoX6cXhXMxq0SRXxME7~D38RzSBVc9Lb3WpZdzsg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuDesktop:    "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/IjNNEAHqGKXXwzeb.jpg?Expires=1804155915&Signature=CI~AwC9z2kQfeZoEaVu485DikO3DdZmYHnh6QzObnFZMkYEsaYhKKAu-ZuhdGbGlDjxbK2z93bN-K23YDDu1q8Xdbx5ghieewZcSr6Ao1jclHWgD8xH0oRsoLtfKToKxLepc1bsB-LOV9y1wpbYjg8r0qfzdiDu5bM6qlyUxUTYwQ9Q2oNFB5LMV0uY5I6CvaMUNhHJn5fmspk0WRQ5Gg873DdYsmljPrWlybDh99-GTUXigmF4Evbv8VRzt5McVXB2eu4v~F3sKqQVhyB8b-WMjOPQ4O5m6fg4a2v3HFBns9TPcTzjk1saFfZ93WDMncouLYBPMT9ijV4PC2orhmw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuMobile:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/vFYLHPtdaNoKeQav.jpg?Expires=1804155916&Signature=OplqIa0QBA83KJKVntVzxvbnWE94UjTx4cK7IM0zQAvnpBS-OkL2zTZKnBB2djZ9VT61k-rMC9qB2buB5QntOtCXBhDKVajgRAeRg-dfkrGsQ-cylj2F8GvOdSjBr2bPvcZnYpHGHUaw5cIR7Ya2MRFpI-JRk3gwlqYXOBvXSGTBmFTtDNF-pfXgPrE--tusLT3Gd1jGjbis~y7ew-lhM5g-lKvS8Bzn6cgxvr4nAVEBshY89mxQ5tUAJrWR0xQsn8jl5KeezFdvsB~XzcDgcAHMtwQWXE0axBCZOHBygWCb~4HHif1w2qd~cCpjSdXjlHYvu5a8BHcds5~as5jfIw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactDesktop: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/MmOmyWVbwVxvaRGy.jpg?Expires=1804155916&Signature=YLdkEAhp1YQob3sPBkyLfFBzdBeJUus1n1ZZPLiyA1ThiEnZ1nerlYM~1aC6hrYZEWwHW1q1DeI8ccQmD~fsraRvCzqaLmLDCg6bFhNPr0eclGsZuZL1s5uVGqYj5YHDDr9wB7zR8o4MttyrX-EyBNrcq08SchL3~KbER97BGOe86EUAe0YnmGkRXFiOx8LfeHbHKK4EYhTiKO4Hv8h7GKkOEB7HR0HgRAHgd8NosE3JpAjxqkitC4q~LG6DIi5eRgwSYC5SbqFFU3EabF7mf6MsDc98aZcI2PaBqh9fRO5QZO-zBdKGGU1nJTm4rMeibmodmKQfgaSPj7RWdphcPw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactMobile:  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/QeKYqJxcUsmrjLkh.jpg?Expires=1804155916&Signature=Md5VFMTb96xo5SWBZ5f29ZDjLIXSERgWHinFawvtgzCQP5Jdg4VKiTBZNSYD2f38NQnxiE2E23VoOhj3BhIF4soSZ4OwBngbPJrwM9Nv7h4Mnbv2qj22HS2rkkv2h3sdSsV2c6s8zSZsLP0tupPMq8xZ9fkoIkRCaU6rTsf9Vosjr3S3YH9LbcslhCpHBQ~RrzfoPhdF6K6Yh6ZBqdbU3raeFHrkH8dC7kPhgtt5aSSyeUoMWHaTsTwmIebUvQ-EarjxsMMaciTOFQigdsNvV9ZeQKuOnKJHiyLxE155GwAGr0AtSjSYCzTqbaUxjkmMf3VcieAjHoDzVpeGKf4K5A__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
  r4: {
    card:           "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/iYVawESYSulmHHVM.png?Expires=1804155916&Signature=iwo7M~N0X-EiGUZbQgZePlyfdHcxXgV7j~TkjicMdnwlmhQClwyU7dHsq8yHnSTCTGcAqQYPh90frV8hI-s-RI3JiBqraIwzNwo5LurfMCkR2QQwrpQlPSvhkrXQsfBcGXUtW9lejbe-C1v1l0Qz3-aYlZLQzlVKH1oK~OG1JBA1IuSlX6OeJH4iNFj9SbIe5LoiPcLudV-hLSZxN8Vd-iewpPYGGheteAoYH0FeNfU5pZdN~vVEpPth6N9mdesjHPMfjCLaP91vzyHbcbmJkxmrYzNweMs7gVOhEjDFRYsgq8KBLc8MkhkfF4CPjroNlVw0a~-yOKfhUmqQxv3R5Q__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeDesktop:    "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/fHyKIfGLXnXWiHan.jpg?Expires=1804155916&Signature=JISAgcMesi4TTNK9PfiQJcLn-vgePlRDSA-sHZ~94ptCNh0nMpP4YGCZ-ONrDaa9Qc7f-MDSKU30YTzMAw28HAtrDaSJhfjqwre2BiJIW2cS6M2hf3sPSJ92ErN3HMJM0uLaLtB8zq3bL38RCyR4BDfiRKC2-ng0lu2O2jsX7d9pRYx9Ges89p~UvgAZI7GBVahM29L5v7-p8zBsNMOf0cL1xk44SMluTOa7aMWeFbbtZevx~llEf0LLvAvbrMudCGjbnDzNUspVP~P6XlcyuUQ9hrXCyfQfEinlKyE6Kadwa3OpIUaM3tTp97wMt3ySAj2a82bSzfnmRqg~m1Nkkg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeMobile:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/pQVFpNclGHLHgqgu.jpg?Expires=1804155916&Signature=Tb98OqzWVks8iPr94BG12Ts6RuQurd~Zdl98JZYNEwWzn8sHVe3htTUM~zRKkYyThWfzaWcXvwL6q7mMWanjLKswOSS7qZHKVIjxyYYtdPeREpiMX2c6tSx9e9JVCLnj8eI9Fupm5YPR2yVWIDSddUawDbyvmXYKPycnw-NSAE017MduAhXlfqV5aau72RcWaOvBk2MI3Zbc09JltSKg58NXtKvfkAatL5rdH8QTIq1fv~b27ZZQJPBNRi~RrlOxz75hcmLoNpDwAlbHq-7rV2Vk749iOWGdh0Eplkgpl05~Me1hSyVP7ih~HIxRqPQUx6yKHOq8xpyDUtWHNQLXEg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuDesktop:    "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/HMYIIPAeGvnYGxaU.jpg?Expires=1804155917&Signature=nWK-iZTSa8stAZgoYHmajqtdGJ1m7YEa7v79Kz-RUK8kSYyuX9SkWzoT-LQ1ckJflJaPr9Cm9S39TOg24iroyEQb8CZVafC8lLsf3QFyaTUWj3Ybo853C2myMyEUCp7u4BNH1NDdpnrKpCIKgUFVv7LtuK92fYHfvpf4x4cEzF92JAybmehRH49K4Vpnb37g6k2qiBK0WOK-Yy4QX7-5j0avSHeDkzRlEJIAp7DjxDMnFiQbY8JZlIpfjG-IUi7yPG232IsVOJpfhmZams3yEOI1qO9RQFIIml3YHu54UOWXiYqwacLqGmAmiRMZZSpYNsFjZftRawek1x1Hi-CM4w__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuMobile:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/EexQikoQVucNhDpZ.png?Expires=1804155917&Signature=pZPBTbNBo~aoziF8GHlRnHiucmuafurfOcjNnhfR~OrpVCLsAM7w9VHMZ~jFmHtHpsUbJKBzCtk5E3W2YF64rNI4dQOQNSRnrfmz6Hzw86tJsBYhLjIgezNrIn5F-8eA9h050~1UyBvl2DqTnrKmArerrm-wKMNTmOzNdyVO~771~DCQt1Bp2FA76ki7x-iEE08WXm69QnKDkFmPebQGm69Vy3VgMZ6OZ2~rf2K2hVs9QgaImXJe2MSiRmU0sifC1UR1jA9PlXzehWbAaGVo9wfee8J-RAs8VE4mBbFgeZlggdSK8JUfn8HiXvsqWP3KlXzSK-dzW8DNaON98eW9Og__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactDesktop: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/TxEYEKzSDqojISiL.jpg?Expires=1804155917&Signature=YG~X~6u7Xozj7nUHAND3m~0rkauFYva8dT1Oeqs2v8M9YI-Pjbk1ChL~0oCraljHUOnhsE~ch4mFjRSJ9PvJRdOaW9~LkMTKYpZDO~T0a4HsNmnUbLjftQSqQj21HF4WXZiPU2vcK72JR89MkYVmrvC6T55YxWhVObYSnwzEIp7fXELzq8-oMRsbF~yubd69-lqkc4MVZJlQRY4XnrxuP130YP1yO5~2KBkGks1y3joNYSo2W8F8WkOiaQPkNj3EPs5uxwI4-BaVb67SIjLdqR2Msiu28hMpF2cnRqWk5MSsKLIsSoVtT1ZXwH16qRheDJhBGriZ44GtkjPMtjX9xg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactMobile:  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/VYmjqqMKDpqwxfPx.jpg?Expires=1804155917&Signature=VM1ffuWLzzIh30VoMpEnCasvbPcNConj5epCRRxYQ910wt7cW2qdp7AQWXYDkQY8AR6KdaKAdHdI7Ff586pI9Gc4X2QsCBUbVI0rdejoA~P34n8~ZmuWGPxDjlG25zYdAjSlhmlcokKAJ3~CbHottD5vxKNH4JzIAfCTARGnDOChvh0Wcm1N9vYhug-ngW-AjNABuIK2G04KN~ljs~L7tJRY~gcSY5~rH8Yk12E8fxtosyConcm2W4OWDvdzAw34~yp-jZHF1DzclVQozJnDyDu2M9UondvZyndP6KeZyKhSxRWWbQ0X055NxsDm0PGEKOBhTi3zQVRBHlsesm~bug__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
  b1: {
    card:           "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/JyHQRjqPVlblrfxy.png?Expires=1804155917&Signature=nXItT-k29wLV-5kRmvnIZi-2~BybQGrUswsZYub5OO8LHaCP7de8yE26ZHoMELyNwHttk686yxhHpSB6b1YCJssJ-4~5AoAIYSITW-s87XJjwZugsuD-CED4gjf3UNTU05~gqRRjO5APKZGgn5idkjrFyF-g12tnho49W9gdcW~AcTJ1H~l~Z1RlMbV051WcZm80PEnBzw0DaC01A0aVfwHM0OEtf1Fh4wLBgFn7aPXXukB~aBrru8Cl5fGSUIX2fhAZ3PB1r2U3YbtfIK-0d7cYzJuJ8~Wd0NJp~sz0R1U79XiZDPEuCsl27~~gv3JVFy5nOZwJCyThZzwcfXGrVA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeDesktop:    "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/mkwXpPknntRzYJtF.jpg?Expires=1804155917&Signature=m2~DRaU9ib6bozU0aKcjVnYzQOVPvvfp457vavkyoacjEFgh4y76GncaM7mdgsMXx-MiVa94gzqM7wPR7NByQ7f9K1OdlsSNVL~KaKcGkm500DaKsGU1Z5QQogkPVgbhOET4SXewvqWMSfA2A2MLDXu1ZbiNpW-uRFaE9i1Qc7zaNkg5V41vp0IKzO4ei8m5qOHMBH1-ckTYXeD7jX7mWtmHJLcwHjHSZYtNzO8gOugKC3MVgrBPDKtSa0JGwqgse6DdDQxidSGmLf6DCDQ5qJfKwylJ~aD4ECqm3VNGNOTJAtsP4uW~aimXrOGt0bfni-ooc086NpuGt1cB7T2F1A__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeMobile:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/glPXgwhAwFymOCMF.jpg?Expires=1804155918&Signature=ck-it9mxFlV2HBoA38ypbkS490RORfI1FgdMm48gFRtsZMXQ92ezMRANsFeYiln-ytELj2c5qGgL3tFOUUdNv~TksE5Lpf3o8HZdRX06tZAcIX~uH2w84DadQ132QKrsyFiBkXNISZy7JlPa5at5yuUYlT29g-gCRD5g8Bui-6DCG3hZGDzOM17u0p7saRNxvSIdb4NDsypy0HqxT3F1AlCskH~zGVl7ENCqcIbFWhfi5yN4Fu0T4c8EN36j158vYS4X7SvbEz2~BDSGM-aaKb42tFo3N0O-fVMY5uh5d-cQP3lPguaFqFUCeUzU0nkyP88c8N7kU0JpWgy3sE4gOg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    servicesDesktop:"https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/mEiHCTyAFEXdtjWV.jpg?Expires=1804155918&Signature=QgDkRxVa2EFTsjEZ6kvVbILtsfMw2W-iG~wPeOfoPj2XaIksR8tV1--0JM9gAxUX~VD9S21SEFwK02ir4dbLHa7ASs-NblifgU-6YnqdikC8naKYw36dVkMUtgCTjBpnPwlr9gWJmiEN7lzbnkft0tSUJm3FC2WRNPQt~itM5HGEibE7UphCNRcCrCE8csHp~KOPL12gROIiQq-B1pTmJoo39Gl9o2Au~NyXbaXaqmuzIOscSyHex8PL5vQlcjs50FGCRuE0eUhpQPjvPbRDMOk60dtGSK~xbyEX5smoY2C~wpO0qFLUX39hDv58z7kPz8GGR9pBliRMQBf-dUODQA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    servicesMobile: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/GCxQAELZSsclOnPh.jpg?Expires=1804155918&Signature=tAWf~9ofNGSK43Zv~FW-6zIfFpPiPaVORQuE6jt~bCNMdGYZfhU3vMWd2LMg2PKZArLPf4IWrFDxs~yoRlLNLhSVZ03UEHQl8JbX3-RCKsLwWj09PrCCVbVPvoGxQVpFwxJPw96nw9OrRmu2hhMtWFOkcYtGuTt~~PojlVCXgMknHp-w3Pgv0ebuBVqhDPtVNMz0sT6KZN3ISgAZETxtbhXBA44WE8MNHWw6GGXaXZmlnfYNclM-RT4JTZHbWsvjkhf~sUcbhkNXUKlJE-5k7pUAmI-UPdP0IUU7G26i8ASwzUNHq0vff75wQyL7gTCCBWZJoPsVOjTz6lblhZJfGg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactDesktop: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/QTuOFGHPtTmQYcxN.jpg?Expires=1804155918&Signature=Bi3TDQu6Z0abGhay~XoOAHM9AixaKAZSmOH8e-I3TS5GLnruRQEz3ms7hIh3s8AB5JSFXOFiISTJAdDxPyIL1KvzXbwOODJ7MUL2GLNFP2gkoJctAPSDkQDMEGzuGmZ36NeT2uENmTiQwhokAEA6Vk-9Yo87sbYItyKzzBvfSf6uaYmeBX6pBklGMhs3DMRprcN5Yf7LtFHhl-ZhsFRi~ST9AuJf6Z7gr0yR0xSlIHoT8moazGVIsuwPIJyaL0~SoPF4AJFnlPZYsWQPi5PyAhuWzhZzgR4BS59fSMwyqbdcThIaGhwmpUGx6SDWlOpvqvgTQ4o-h4ufAo70Jc9gsw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactMobile:  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/xnTYcPlbVHLcwLwV.jpg?Expires=1804155918&Signature=QtGFSLApuoUUCgX0bTw3apsXjntCNADc0tImKKRcc0AO8nw7eNyLcUum6wxYKHu~ufsNrKQtevh1aXXmFMZKYeKRI-3uTHA7skcHdnLRMOsESNW6Ympn2yk7ry3O7~r5BIQNRUdHV6a5zz~L8IJoPT9u5J0Uu~w-86tvmdzGgd8rabvgRlIQgZYxwoMBUkwU0CCDR8YpZ9435y0NIVwirdL~DuH3ieVxUyC8BktqhgGybY~zWsbNwhczMRbkM0ALbVblpsPwRTer2mCoHLkH6oQEEf8eBFBS9K~sIdthP5Dqryl00j-vNt2YtdXfgoEsn4Rl9~9diJgcCOp1RCoddQ__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
  b2: {
    card:           "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/YGtbBkfQAFlKcslg.png?Expires=1804155918&Signature=TsW2g3tvm~1XR9MUPpgDvbap6q1YmL~1eAJX-Gh9mvw9Pfs5G2D0l9yzKNfKIXXrF5YaYX9z8QWtp7df8xm2Ok0q6OMdvStxMHE8iLVWUvy3jEWnJo0Htt~nndEuq~B-JxX4KADmXiEPDeWXuO24TrHq49Y8InfHOxbyosEsAEsJ4XnFsVkigRWMwQ0gzGocGcfx53rFiFWW46V~UqOE7GK8AGdL3wZttfN5Gae3YsN3aH8RVyABDX~GkxKdtsLhIzmvHyTE7-x554zBz3xPbhtf~0-wB1HD9yvJW6dTX~O2hpRMe~Cn~MTkhNjBLV395K7uOunb00iZKJM-X44lAQ__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeDesktop:    "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/JmNoAxJseLXRDfgT.png?Expires=1804155918&Signature=osQ8G1nJRDzb4kz0i9gzmRM7gJPMXB9KezEWD2PM0Qs9zzFClXLSwxHu8COJHkxqoxx9Scwh0GoABQFxMO4PkUqGAM7eoLgEQ-Ry~SbsW6ZoJYKl-3f-BcEGPM4tmPoECmRVz62l7zt-MskjJ2P4fDqfEc~ZLCFCYU~vjCoRiLz3VJj6iZz-RKlqC~VRHWHAIoGNOmCOOcXbL-HjtET1Dj7HsIApEGZN3v5PkZg7tJdA5EqujGdK0pgE9J-SsYmfb3bCCMt-ICTXKYTAIGTUPzpUDBhF8U~1eSikNAlk~V-YgkvPx2NwHeG47jlB98vwL-y6zF6bYx~dpME4-EJj2A__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeMobile:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/VscAMZaELdZLaVFZ.jpg?Expires=1804155919&Signature=bLk0hy1m~j7PXp4CWggOkkaj7rVLXKSlEb1J2cg210a5iZGiq2flBw6~Rg0Rz9qakz1lINK0bKyufLbh-UHyP5ySYMzK7Pl-SK2u0gWCujiOoKrtOspp68YVH6QgtxmQkvV-C3hdqtpfuk5T0ywb2ZZPWB7RtNfWdSrtlbBeuoToaIPLuYlIDYsMz7xOFwNpKAwN-Pvbss0vjFrfhq901yowu4m4EOthAXwqJ7aHf2HvYkAOfikryYYa0SURFOIEECoXp1hCr-4F650VjVGzboJxXQTDymJLvX25QQsI4t7Yz64mjuWqPi7sI9-Obu4tQFMykW4XP5z5UOJr~KVK8w__&Key-Pair-Id=K2HSFNDJXOU9YS",
    servicesDesktop:"https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/ZNnGvKMbPhEwuQYG.png?Expires=1804155919&Signature=T4H9zhMwJftp9S5GsE0-WeVS5NGh05r-JdvFU3I~TrZPlxZc6dYBFHI5NQ9UD4wrMgcDilh3FvLlRb2Wft7cWdOqkk6Xlh47NadWoVVoM9TxVvkkxUTNALI0MsibLp~E16Dzd967aBndPjohx6GKL2rrRVQzBCQ~N4ClEQDFNHvR7shQI6kg9wy7f6rVpJxEbDOPfwe00oChe~xZfD1tx3vy-bKySxxSqrpu9hNa0L3JLf-N186TLVx1xTA-2Ym6iEWjNV9EmlCz~OeA654uy9YhmRXBuHAZTAkvbYrkwBwdACbOucQuE38MH8ARiaodXJpRJ6wEiOJvO7SFMGb56Q__&Key-Pair-Id=K2HSFNDJXOU9YS",
    servicesMobile: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/FmrOethWQtLAKJZC.jpg?Expires=1804155919&Signature=wDz6Co9t5k~FkCqeWce2KH1KMRDLoYaFm1Hw~pykNm5PjM2N0uy29Ktp9gOWSxPCFHEJpF3Q1jxLglceuLKyIPa4zt-RoCmjncGYjd1nigICUqAOqfuzVpp4tgnhlNHJa9TyhhIVI~2XgwpbBB0q6nhovnnkDAChyacOVnj8JVrmTkR4KbEpmoiS-DHI23QMJX4jSvDmXUahtCidPq42dytoxvP31TKKqEFX3w0uDe8S~PqgOvJ~p2L3i4b0z1MmcYTJat~vXGM9BbODbXSs2aGt7RPsCsRjAg6XZC3213MZLbta6fw7S2r3qM0K39nhOWy1tmiMaPH8-rhJeHKzTw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactDesktop: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/ZNnGvKMbPhEwuQYG.png?Expires=1804155919&Signature=T4H9zhMwJftp9S5GsE0-WeVS5NGh05r-JdvFU3I~TrZPlxZc6dYBFHI5NQ9UD4wrMgcDilh3FvLlRb2Wft7cWdOqkk6Xlh47NadWoVVoM9TxVvkkxUTNALI0MsibLp~E16Dzd967aBndPjohx6GKL2rrRVQzBCQ~N4ClEQDFNHvR7shQI6kg9wy7f6rVpJxEbDOPfwe00oChe~xZfD1tx3vy-bKySxxSqrpu9hNa0L3JLf-N186TLVx1xTA-2Ym6iEWjNV9EmlCz~OeA654uy9YhmRXBuHAZTAkvbYrkwBwdACbOucQuE38MH8ARiaodXJpRJ6wEiOJvO7SFMGb56Q__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactMobile:  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/rkFkQuzsELVeVHTo.jpg?Expires=1804155919&Signature=JREJuTKWP0uHQqbui6TVTJuY-E0Q0YtSPFNs2D6cStwREqcchGkDxCnDKQ3Umz-J28cqazBtghka7lNpR0Ndn0zl097xld71JABqIW5GNX4gkHdy5qnKphoybLPK-FWHsipCMAajwl0indjaQf4pAeCwChmK2BvwsefWxHEavd-bVvgZeEdsdE23~2o7IjqhBkaGCAMqDth3~5cz0U4Yi8kieE7b~QmFRK4CrqdRG2vey41FOKwFpoULkJj9GVdc~sN48nPCXuNRkMH7kZnc7aeqwukdbiGjWHne4rIzZPdQDUpMWeXZDpGgOKRPjUjZY2zc2mEGP~Lc0q-c9Dz1Sw__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
  b3: {
    card:           "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/uVKuMEfdHQCjujxn.png?Expires=1804155919&Signature=D78y-Ku~uYaQ9AAQ-6jbH7JbnqqmEF5YhVxgBBSg9DFLjXXkDvzDTHFl0B0JnpM7A~cMaph073tQ6gtY75I5a1Z5IoAu2CI-qoUchd44TbDOKCfvyhEsPdOy2pWdyhUhpD03fBxL7AFq3gkt3Qjg3SVaIHpoB2NExT0gYehp4HxwfXPrbwm~rphCbzQolE7AA7G5P8cSWGV9ZOBPeZ4FOAh4W~p1CjL6IdnQ1nLk6xPZyYqrygpLXpV-FgxvgSBQEb6K1daAH7CceSmBbphcy8HL1iP4sl3BlRwak7us7qmid9xI4y3sEzxIzur~1i55GpYvSq-ObAUmjIU6n8lzZA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeDesktop:    "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/NVTeQidRRmePHdqS.png?Expires=1804155919&Signature=mABH2n7XNZlyrnRKbhD4Y-GEpSgWRbT7-PZqkKAnclP1C1cpRrmWWQZvKdcjDH3gHvNSz9V6PrOGWcVF3LnjwZlEaE-5k7hvU7APb8uwTYkpnCFTPHxBHfqlO~vch2pdwKLN49H4gPH6eTvfuhFJgOzDopqASs5FD28ItZaz-02ZsGcyhemhIUYNxGciYGRhSejt2F6FHfjjo3CQpdUYF2bnojT2CXc1fs91~ndY9EFKOuNdoPKv-D4QJU~PHEbar1~AE3HSHuTBngHKTC2JS5dnLPkzvh0WiMxA9deYshG8s5vVGV-US5MMBG29fDkLVPMLFIhtNH8FOMc1NzU9qw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeMobile:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/LSEUIfuqufrRTMUs.jpg?Expires=1804155919&Signature=LnGeiHg0vE3hpmsSUpN48S8xi2Z7-qIbSttCexFhXNegdEMq1hwNd7tBqhYfcEhYRTEBZQSVQ3y4YCuVGhF8hSZEZVs4QPzgsacwqYBLZu8NqRa-Q2PWScoZvVUTgxvOMukaL46nDv8N6ioE3icpSp-lQwm86okPFa9iz4HgwsskO81BEQqUKNFzYJac5gqiImb6Uv~FB3dVvhFV~C1UQlkLprkacUTz9SUOR4ODZafJyaAzFFVbEZYF0KI-OOgqeHf1Qj6O7nteGSAKkeXlFIuUiQduQMsgmzYWl1QMu6PaJfVZ-fyV0FSmT8Eg-V7g0fRZ4OxrjXRIHyaxv1ToXQ__&Key-Pair-Id=K2HSFNDJXOU9YS",
    servicesDesktop:"https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/DFvKTdhFYpzVyeOo.jpg?Expires=1804155920&Signature=vtgjcNiFezHzA2Ql0UuXiy4uYzKR8ZrxaGF7OisdvJZ5lPgbFvh5oK7hDL1Jg9gwd50Z42bfgbfmdAKquVKihxxgTfMd4b0V6NaA2Ah8ZFFpwuv-uDSkVlLtsD0siQz-3ebplreyEv947x4wnNAslTDb6vY~3zzwSJ9D80pnIY5SnC7YuuXz2qCLT3C0KVXV7c7e0r2OWNa0-Q4wudwmEw-5fEQQDEjClAJkGn2HeKd53HviRMFa9PaCf1E1orXl9Tsu8Kd4CM8~rG7-Gl82y0RMdRgXWXzC~BvVLcrCaE1BIfTKWr2ROqVvu1iQnzxlezryyfiyxrX-rgs40XkVIA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    servicesMobile: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/eTDGLdMCoTZoEbpj.jpg?Expires=1804155920&Signature=JrMyrh4QDhYH~Fu~t~9514N4kA66zpfKDcQuNHX0bMPYiXP7Roy6Grh2Pg58wc5Cw6dIAUkZKZ4-DJXY8NsILedsGn0DZqxoFpwQwTyQutaNawur3efFy3PPTw-~sr33iEZFsBsuotZ6KSOwyCvQODxAuFwnNbaW639o8oxwJCBuNgvmRYm2UWftJL9u4TjiqhEOvpZsDVZOwRy63NZPLOjOlVbjMwm6nLmnIcZnSUVJ4rKwP5iGXNSh5J3MvQ5HmtwJuwhM5WR68GgD7bJC5vji7rc2YGdvYWBmWPzKPSdddoQ72dYncBBi1YqI7MmJmgj3dC6-om1toQNqS47WQw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactDesktop: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/NbHQgWjHqDAdyOOK.png?Expires=1804155920&Signature=iRSNXDCcVdkyj0TxlypdKUq0F4gir8fIKgrg1cHK0yVD9zAmPS9ML7GsdKGoEXk3PmEvVynxKauuor79uQaVTZSNaYVTE9MZqGzEGpWeqqFR3FrrQhRQxg8KsiUzDozPoZOp6BUPkKGEXzswflhvOtTq7afXYLmN-g9RzRFH-S60mQago~Q6BWbqO3-iWxj3IjRTrIHIzq1zWN8n0fjuOAZjFbxS3~Wx7-uuJmLeDcJal9vsOig1qo0fOK05c8S9hmQ-FZYrObPh5UDlxggEmxRZ-25QsbDug7wgB4xRfJzfK8MYD6Zs3NJZsraJB6Wwb3xPLxjGoua6GVsnM2QhsQ__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactMobile:  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/kRPSDMLyzlQsfdaA.jpg?Expires=1804155920&Signature=C5lzt5o3gEP2bvf9RiCzYV~aCYll5-xO4HB4b7SwUpB6dtOcv1EKHORa9niEbd9vbZ~D802YRHsuVZp8akKJ27bXFm94btrYnsbcqzNWkvyr6qfv-ZNlvMQE-8MYJ6NKGvHgPTl0Dh8vS2Kler0ltR3nvOy487STvmcQ3ZdYKJsTnBXIKLe6s47oHMxN9rnDQ~ZSY8Wg6A4w9GxdMksk4JcqI30xKR~MTjtecTLz0D9OzfwkkiRMDvlh95lowXuzFx9K7lL-hUzNmb3dTqcDlRwkSCSQktIn9Na3qmrE3UBkxwbD8z3EzMGCnTh0Z-f9xq4ScoiY32tfcYhF2YuTPg__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
  b4: {
    card:           "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/incAkGiBBarJSrgs.png?Expires=1804155920&Signature=BrLjllJLe-NR3PvtWDX8PbnncSAqRAvoNLtIisP1yjdvXGwYW9yMqfLfUN~EH83KdT3KEED1r7RFtGlAG-YmGkKsW5-k6w3fxyl97bnQ8lVIMEz4KISfcIhW01YAmCXY4FKvLLNW7e2Yl5NsdpUOouPBAGT63ygZWBbz~brb842f-9sbP55MFoPSDHqGa0eUrmXKo-QFh6mIhUMFMmJ3jyIowFGWBgzynqOiZ~nffe2ET6-QeOepCzu59dOtYtaARJasmwMHuov6bQDdRVfdgtQnBIpBdXTqc2dKy7OJCYLOCElc9p6Nqkj~7O2OJRvR5IBWqWC3xf3lVDrAIXx8gg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeDesktop:    "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/KgazPdTsZetPEIJp.jpg?Expires=1804155920&Signature=T1kQ07hyYz-gau9TdM6YvyTCg7co6~GprLrkRFEsEzRj3WiFbCi9XZdJMM0W7zywfBaE4A0SrCinIg-FuJaxaQs0tjEtzxFh~nr0lRPyc-~5p-PytEqYUqwhioxw7iJgrP3Lok2tiNthI8ksXYTeFavWTWwIdqW3y35aTIMm6O-GbVzoQJtv5ThHY9TlxW95UBkuO7Cecf145BMQma5yyU-qDnh2-np1Xus1UxLW28CIEnQWZTnkl~V8MhOfomeD7KWkRf9P~HBARTESgmzO2~qnjkwYMCCFIVGjdfClsAKXzZ87eyv~yCb31HRYoD~bPyunt9D4liODmsV-rIF5fQ__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeMobile:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/jlOkVxemyMIvYtbP.png?Expires=1804155921&Signature=twAdr5t9oVXCwrxH-Z5CXRNmptGZyR~IdD2O8foZ79iZrncALOQA4R4TngzuM~1i6RiZFmL99zEekiQpGr3e5sOv7LDj~LRCEHrU~UYfsPyiOKxettW7kjlhXwNYHp7k6W8GDzQJ~aWilQtRHC2nB5x8eGRYZwcYf7B8Ighyp9EC~X0xg4N6DUDXAORnadkquu-H4QFS6PbIZls8-aLTR~4V82XHodge857SHes9Alduzs~9AqZbhUUL0SJBPwgqm7KMj5DPvD8ofIVJ278Z2dKkN3wdpXPSGJyFFY0z9p1dLXo3CfFoz8R9YGSD4PHkMv2j~ciJxj4mvRp1mEePYQ__&Key-Pair-Id=K2HSFNDJXOU9YS",
    servicesDesktop:"https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/JcQPplGeUjKwPYmS.png?Expires=1804155921&Signature=QG~UR9SvwkwY4EbL~vstTqruTzUIWCKywoiTxL8ieTuuuDUMgCBmEe0yP0xvRZjCkHmJRT~LxCcaCgtQ022SmagSJU4hFe3nc1gHQcgEj08mINcW3K8RZy1Fv3awoqPN48DbpSR52EX4IRtbHvEdWx4dMJ2N46hKsDBvi0CPSWAADrG-orL~t17ZrapXRKK4YH8VBRYj1wyL-2Aa4kanZ4nDm6~Skq0rzCvsTAIO-qwYdq4TM880n7-Hws4FQAC~Oz3jsBEEcNgfz4D5koUFhIAiWABaShCculI06pu3iyqH6K-xeZXOw0w1oHE8bxs74EchIP1c8Gmfn9SZOP79pg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    servicesMobile: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/QJqRSqkBLFOJTeqr.jpg?Expires=1804155921&Signature=P7hNfJGmzpeUxB0L~-tbD7hVZZv3flfpS1Q2FftA3FNJIKYvrISbHN0Q9h4BbiKvTA73yXqwDXWggetbl4uJPTbsbSV-HsGoE1Cuykh8Aapo~0TJAaakWG8292hiEvyMKfranlAYHi8n8UUVN635f-hyhpJCBgEQef-QutKBHx-LS~cv3yyxhB~HBjGOc8j0O24r1Krkg02QT3s8aFX9tbIsnqj3xKJY-QZHfFxthuj-ivUXfG0SBvPwiX13E1drX21WzzvvgDV5V9hX3D1BCnxvs3II23UnH~mlquDHJhQgmalze9bRlEbnA5r47A76Oh7Z2qMyWuIHP0msaHuwIw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactDesktop: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/PRWXpMxlGwHmMFfC.png?Expires=1804155921&Signature=qClfpJHakJw8n9cXsyUr1r9iI766bBKlIdO8oBym0DaVUl7mUnlJOpfQfaxB2xW0d5gxN5SpaaLv9MYcz5lc9pHOZLBeZjC8FguXp9OCf7kxfZ8Iy~OuZC2C5KCqjHInbJL6z8QTos~3ONsLDEou8br81cbfn-CBBpcE4SFCIK~1yXkFjwEbvHBRLYjnyagRSfox6HE~ZKkqgJTEgpOB5laXpvKbsCtohHQuQR9sNiGXD5TxqdNif6OD9Jo6-AgVEiBvbs~ssxIy6MlTV2VoFrSZFwEfoSWIaKoNm1Re5o2H70KDqu-5iMJ8QNHuFP-wAQg8eScZE5tRQP2xsWwmLA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactMobile:  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/QiUFEwUITGElevmR.jpg?Expires=1804155921&Signature=TywWDa93NJ0C2GxBtHRmXccoc1VLMuVAIXSRe75Y-ocHwL4GfFqHralRtzkgbBNvAhL4qJQ9lE1mzSNQH~vpAFA~6nQUGGrhKEk977HXVs1VRF3lyAlnRZMsINVBuK7PTY5zDBbRLR2RFqwQ4QSX9p0LH~zboPZtNenCn~3bk37kDBsOFxnK0SLRLD4dfmf9v5U6mGKfB4IzEybhID2nIDYIfsTqpwT~jfx7Yt8Q7F4qTY6gUHrAuzlLoPAukn7EM2Cf-80NaJAp7kodDldczL5vO3akKPZovaqoVHePFtky1u2MZOMJdFbR3AiuUv5NEsze6KRuCwRBTp4RPz7fGw__&Key-Pair-Id=K2HSFNDJXOU9YS",
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
  {
    id: "bloom-beauty-studio",
    industry: "beauty",
    name: "Bloom Beauty Studio",
    tagline: "Elegant & Feminine",
    tier: "Business",
    tierGradient: "linear-gradient(135deg, #C9748C, #8B4A6A)",
    domain: "bloombeauty.com",
    palette: ["#2A1A22", "#C9748C", "#FDF6F8", "#E8B4C0", "#8B4A6A"],
    paletteNames: ["Dark Plum", "Rose Pink", "Blush White", "Soft Pink", "Deep Rose"],
    styleLabel: "Soft Feminine",
    features: [
      "Elegant hero with booking CTA",
      "Services showcase with pricing",
      "Before & after gallery",
      "About / Meet the team section",
      "Contact & booking form",
      "Google Maps embed",
      "WhatsApp & social links",
      "Mobile responsive",
    ],
    pages: [
      { label: "Homepage", preview: "home", description: "Elegant hero, featured services, and client testimonials" },
      { label: "Services", preview: "services", description: "Full services menu with descriptions and pricing" },
      { label: "Contact", preview: "contact", description: "Booking form, location, hours, and social links" },
    ],
    style: "Soft, feminine aesthetic with blush backgrounds, rose accents, and elegant serif typography. Perfect for beauty salons, nail studios, and aesthetic clinics.",
    waMessage: "Hi! I'm interested in the Bloom Beauty Studio website template.",
    price: "€350",
    images: CDN.b1,
  },
  {
    id: "glow-wellness-spa",
    industry: "beauty",
    name: "Glow Wellness Spa",
    tagline: "Calm & Luxurious",
    tier: "Business",
    tierGradient: "linear-gradient(135deg, #7A9E8A, #4A6B5A)",
    domain: "glowspa.com",
    palette: ["#1A2A22", "#7A9E8A", "#F4F8F5", "#C8D8C8", "#4A6B5A"],
    paletteNames: ["Deep Forest", "Sage Green", "Mint White", "Soft Sage", "Dark Green"],
    styleLabel: "Natural Calm",
    features: [
      "Serene hero with booking CTA",
      "Treatment menu with categories",
      "Wellness philosophy section",
      "About / Our therapists",
      "Contact & appointment form",
      "Google Maps embed",
      "WhatsApp & social links",
      "Mobile responsive",
    ],
    pages: [
      { label: "Homepage", preview: "home", description: "Serene hero, featured treatments, and wellness ethos" },
      { label: "Services", preview: "services", description: "Treatment categories with descriptions and pricing" },
      { label: "Contact", preview: "contact", description: "Appointment booking, location, hours, and directions" },
    ],
    style: "Natural, calming aesthetic with sage greens, soft whites, and minimalist typography. Ideal for spas, wellness centres, and holistic therapy studios.",
    waMessage: "Hi! I'm interested in the Glow Wellness Spa website template.",
    price: "€350",
    images: CDN.b2,
  },
  {
    id: "luxe-hair-studio",
    industry: "beauty",
    name: "Luxe Hair Studio",
    tagline: "Bold & Sophisticated",
    tier: "Starter",
    tierGradient: "linear-gradient(135deg, #C9A84C, #8B6914)",
    domain: "luxehair.com",
    palette: ["#1A1410", "#C9A84C", "#F8F4EC", "#8B6914", "#3A2E20"],
    paletteNames: ["Dark Charcoal", "Gold", "Warm White", "Deep Gold", "Dark Brown"],
    styleLabel: "Luxe Gold",
    features: [
      "Bold hero with gallery",
      "Hair services with pricing",
      "Stylist portfolio section",
      "About / Our story",
      "Contact & booking form",
      "Instagram gallery embed",
      "WhatsApp & social links",
      "Mobile responsive",
    ],
    pages: [
      { label: "Homepage", preview: "home", description: "Bold hero, featured work gallery, and stylist profiles" },
      { label: "Services", preview: "services", description: "Hair services list with descriptions and pricing" },
      { label: "Contact", preview: "contact", description: "Booking form, location, hours, and social links" },
    ],
    style: "Sophisticated dark aesthetic with gold accents, warm whites, and editorial typography. Perfect for premium hair salons and barbershops.",
    waMessage: "Hi! I'm interested in the Luxe Hair Studio website template.",
    price: "€250",
    images: CDN.b3,
  },
  {
    id: "pure-aesthetics-clinic",
    industry: "beauty",
    name: "Pure Aesthetics Clinic",
    tagline: "Clean & Clinical",
    tier: "Starter",
    tierGradient: "linear-gradient(135deg, #5B8CFF, #3A6AE0)",
    domain: "pureaesthetics.com",
    palette: ["#1A2030", "#5B8CFF", "#F4F7FF", "#C8D8FF", "#3A6AE0"],
    paletteNames: ["Dark Navy", "Blue", "Ice White", "Soft Blue", "Deep Blue"],
    styleLabel: "Clean Clinical",
    features: [
      "Clean hero with trust signals",
      "Aesthetic treatments menu",
      "Before & after showcase",
      "About / Our practitioners",
      "Contact & consultation form",
      "Google Maps embed",
      "WhatsApp & social links",
      "Mobile responsive",
    ],
    pages: [
      { label: "Homepage", preview: "home", description: "Clean hero with trust signals, featured treatments, and testimonials" },
      { label: "Services", preview: "services", description: "Aesthetic treatments with descriptions, pricing, and FAQs" },
      { label: "Contact", preview: "contact", description: "Consultation booking, location, hours, and contact form" },
    ],
    style: "Clean, clinical aesthetic with white backgrounds, blue accents, and sans-serif typography. Ideal for aesthetic clinics, dermatology studios, and medical beauty centres.",
    waMessage: "Hi! I'm interested in the Pure Aesthetics Clinic website template.",
    price: "€250",
    images: CDN.b4,
  },
];

// ─── Modal preview renderer ───────────────────────────────────────────────────
function ModalPreview({ template, page, view }: { template: typeof TEMPLATES[0]; page: string; view: "desktop" | "mobile" }) {
  const imgs = template.images as any;
  const imgSrc = view === "mobile"
    ? (page === "home" ? imgs.homeMobile
      : page === "menu" ? imgs.menuMobile
      : page === "services" ? imgs.servicesMobile
      : imgs.contactMobile)
    : (page === "home" ? imgs.homeDesktop
      : page === "menu" ? imgs.menuDesktop
      : page === "services" ? imgs.servicesDesktop
      : imgs.contactDesktop);

  if (view === "mobile") {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
        <img
          src={imgSrc}
          alt=""
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            borderRadius: "8px",
          }}
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
        style={{ border: "1px solid rgba(91,140,255,0.15)", WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
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

        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left: Preview */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {/* Page + view selector */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center">
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

  const comingSoon = INDUSTRIES.filter(i => i.id !== "all" && i.id !== "restaurant" && i.id !== "beauty");

  return (
    <div className="min-h-screen" style={{ background: "#F6F6F4" }}>
      {/* Hero */}
      <section className="relative py-12 sm:py-16 lg:py-24 overflow-hidden">
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

          {(activeIndustry === "all" || activeIndustry === "restaurant" || activeIndustry === "beauty") && (
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
