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
    card:            "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/gyEYevahsHTWrlVA.jpg?Expires=1804071487&Signature=a25a4SJJb6gXxcUZQoGizwmdRwDvf9OhuWpD7fTlxkmf1GYAo3ybl3rsGx47uQ-y6Bnp5HKg-xQTTzBh1qkB45gV7icgT5sYV9xEJ2MKB~Np34V1QG-4fw0V5O1ip3eEmjKlgCgkZOa287Gj5DGUW9MZWxMXg~EfcXkmG6IwjExcEKDKKCQCsT2bYewhDloNgyL2cgrHJCJIA-bbeLaRJzRIeQ37dCzKp3n43pmL8nCjjjLQhovT6IVvM0QxXn5OSi563WBqdNGgDJ8gFTZeurocjxjOzapnrXf4BQk6GBldh3rfmgX2Pvaq4y77WNFNdkFkCyisfGkFcucvap3GNQ__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeDesktop:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/BSwubQcjoeJqGqnK.jpg?Expires=1804071487&Signature=flFfKRGdCmMFZnToDsRGkpgS3veqQWbFGTDt0ksyheS4tpw4P8O8zlQWL0eJkK-nQykMJnOuwJqBz6beLQi6llg5Jc793swaVibqTRg5fs9-V~B~q96DpZZuMkGDUkVrl83rOYYkO56IIsoj7ZaM-1LtUbSX5x~I7o57HZW4Us4x~28yLILZhJ3E3dfm9VFPRdC7fCDHMNoFdMxRtHhFluW8lMSaA93Olqket6SRcuPLq4ESs7htk6okcsYeECvGNZtyzjvRcD8r0Eqmx81Y8~WHMgAiio2LpeSVY15YLDsueKqmn~y4eV1tCteF2-4u67QNVaVvN31q6r3h5-pxTA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeMobile:      "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/uQazjYineBOHTlUP.jpg?Expires=1804071487&Signature=i7t0tzywMTSLApk2PtQazvSIqMYrq1Yx8Vj-W6QN5DOoVscvcKJ9au64QHHuQGfbxxR02Qk423Vv2fP8GR5lAJLPIusVLVykST9x9acNgeC3HWQ9RRi~-NYHc4zOn-KQIAgcLfT9G8WGtOw36w-AiWeIKj2OHFev162vxe5PED-oGNLm5ofq7J5QsY9qmp~S5kDOnCKycIXmsnDV3DIu8n22VPhESnN7SswMpLi6BrS3nhcQvVn1~buxyWF2wdFfGwa-tukNLXKUawxxXStusBQlq5JxqrMaUi1S8CiOrOHWf~320tmuv9FGWDhQs9LHdAZDTcOwAHjGkAoMGFzPcQ__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuDesktop:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/ZibiVmYSsEkwPlPg.jpg?Expires=1804071487&Signature=Jk1bjyAagV51Gj8tUE9ry6TpRio-AzrgLR8mqv6lq9kKICZ3xz2fgB~jg2R8Zty65ahm52BxywrTL7~3hB5A8mWjwrAnS~4LgEixYKcs-CWyYh5z6DsB2XuPtujysSOAX05EjlS7avr4yjT4Q9~ge9TOLLfUd1tdYL6AypsPxzxmQrCuO3ZwKrAEG9aaRQVYyX3AlZ8EZHpfhu-Gs3uOtkBs1tGVrzhKpxC9cUYAujIqPgn~13kZlTYJBNsZfFTCswYZ67kVibx695Dy9SjIjedKxiIqkulFheLhIszlYUot~pHioPLr4F-YsNcp7awD3KAG1cpciXCqfOuXwb6k~w__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuMobile:      "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/FhhMEJpEmlojbbfR.jpg?Expires=1804071487&Signature=jWZKEigkV82xfmcfTgXJFirtJICklt8qccB4NJBziMDCHQwCtQ7bUBJbm2R5QmdNRg2yD~1CPuJ-CBY9sZZYLEolUDxNLioNH1jaiylIzzw8xEa0m7i0vFnXBMn2TWBLfufuKNaprFbJFVyAufYil-j8QreGWwj16vRviYyVpXattkVjWOAMyf6r7R~r6VOmv0UMBOuTTnDqHXPXg2pcpTmLc2jH9Et0~Ir2cxYvAm1ws09yglTc42E82uGUvIKFTgj1-dg9Kv7uMgW~MNZeE16A1PpqpuOvtsl5O2gBwBCDFAT2Ioeq4zqmBHjVcm5qRdvFhrBCHrG~4MNBxFYmAA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactDesktop:  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/UXLbWsEBKGPbDbRT.jpg?Expires=1804071487&Signature=JFtm0skH6AmNLMk7t3L5jarqoOfzQ28DOxI5cOaY2j2SkKfkbdTAO9A1JIr-CHGjl2E80mOVqUeExO6NU-nguWwVH-7tT9Dh4flzQjQxVZiq1-wMhPbgYymyxXVnieY7TWgRBf-px88PpXXZ0XXgcKnd9q1zVGVhzUqD70Esksh0e8Bz8BGm1JorFK9BS8G8l~DbuJn936J8SpvnbSw0qvL8UIUjcz5yGjPvAJoISx29SXg9MtD~H6SnN9l~Wz7clmu39T0MW2pOGwx8uPEtzuQ8QsqKhdlHDylVSS1dfD4w41P4bHzQhVznTfTALGvdwnjnKfUU9QMMKlNJsD~dzg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactMobile:   "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/DGOqCgFwGfOofyBe.png?Expires=1804071487&Signature=uf~ZHycNYrq4NGW-WYrx0gfJZ82sLPCacX1uU7S0dagVm9J4KDOXPENEbZTaV1OvEuwiRrKMaZfF--~6mbhQpyp1pjhhbQfIyzKQ5GnSpi5f9cNoPbnh06xO6kGiwLBknR9UxbAapFMY8WGjdjDlFtKApj3z2jvf6yOILVBeHA4mvioARo-dyjNOcVN2iV9J8E3KwE~vhK8s69fgdsp4reDpFkcizucj-qs2GtCKnnibrea~~QN5SiMkvWFW2PQVyNCEo1Mc5ksnYpJhWvsj2xK~HtAYMGFT6xVJ3lJjeKaK8wsNj7Mmx-YAASUlJax17v8Ykl2lk80LcfB~3f9u8A__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
  r2: {
    card:            "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/KfDTYNWUhUHJIAOW.jpg?Expires=1804071487&Signature=d4j4674TjV7RI5fdQGe~zzclIjq7~VSjOA3JuK9Gxk~pOFECA8SB0SojYekwXEoCgWijBAvyF9OfgzSy6vylb6vCe0HmvwLxIVCqxKLDjdu6EPXClu1RBtLYVYUZAmqNJQPeKF0b1dRwQWRzdBrE9Zz7Mbpw7G5rDvPsmBgcow6u9MhrUJksh-2sNJGYHNrNuElSqLtlJlhQuN~fVjICgzGJ~P6aPd6yekn4LwPuyzFpnRw~UJntFFv4Gewc2D3F5YV-Cwo7cZ~lxBjUOwJWdwyBvy7B-OV7sKGl1MCFIfEdYx9DKRvDxLX9lz~LiUyZoQ4gwqvQ0QOdRiEhv5qitg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeDesktop:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/iKqlRcYnNfYOjGux.png?Expires=1804071487&Signature=lL1fxyfaxuDkT098fkWNLUUOe~VnhW4S1jMC1NK-xb7LUsFmA-y79pjp4DxfSzxbiKAhRUkDS~oMAf-eYNHGeZDctiN8xcV-qq-M5mQD75C1Pn4y4rKEY6dNLuz-Ldmg-3GTnamSX5hvUb8AUDMfBxwow7spdyrQ0SjgeiEkFLnEtFr7ChVrAxgvMo0XEoD0UPAjzd7goPUuGiP1zI5slEexl2YcQxR5Zl6hz0X3dQfoPucBauBNBjk9pkNuze5BHUM0BgpGPKilyvlsVH~Mn7A57Win3qnVsJ9hwVSvXlIMYUSIZwMMisncM6UTtqZ2SPUez0cPDRUwg~vC3cuQDg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeMobile:      "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/SceTxkJPPtItDgkt.png?Expires=1804071487&Signature=qFvkpofhdUu92L2G~XNwyVmMUsMxz-7EQDmB2XEbeCQjdC3MP5NLo5W4u2JoN3jkJ3XBvljp~12jI35QqdfXeolGlImkgqzG~sTV402KZ~jH2XDyL0tkWh6S-l8W36fsrA1Vj7Q6iFc1t3JyZdF2vAld8Qsp61pW71oprCPSeIWwkE5zH-fUuO0P5qFNQptgANDt4mrg~fXxlW~nGIUVANZje7p6Bv5wzMfbO5yGTcqjzBcMT3mSiLWJzzraJaxkWuERf84Fz9535YKz1BOkzz2idqx3b1E~HIFLMRzZb8-ALWUa5AdFyIYgmIuITUs86i1-CFAC5OO2LmLMVHhweg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuDesktop:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/zbGPWiBcpGQrHBsB.png?Expires=1804071487&Signature=QV8lTApdVl-k7ghstrJDjY0v1bD4CwKbrwjWTm9a5ty-8vD71tsY46cEvhogdmDNiWhfRr5F4bdvPuiddEaxVKCDFV38zQ2hBEEVT9rN~ekujDtEzjGAKRZB21C3iel77GgaWMuZC3K3ESU3AHLrEl5aKd4-fDGdWBLZwLxJlbCqUn6gR4~3ByPIcXSbU64WJz-yxnw7MG1q7h2CC8KkdROiQU538KKqjBXRMpAQhv7DQO0GdhmA4ywYzNEfo9V5XXK1Nxxhivtv-7kn3jxvvHYyQMEr9DHkPIh21JovFnMmf6Fmpnb-TiHxa8lhbamL47zUixKL~RM67Nz2uWBc9A__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuMobile:      "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/VjNmOKbolfGRJIqN.jpg?Expires=1804071487&Signature=C9MXeaf2HvfOj8S2BSimgEpKGCwLKus5oDhZ44~~ycZ~0zGqiwLxrrvqNI8FgdAAZ5Buro9pyJhYvHS5hUt5D-AMvk7Yvpya9-rquvOE56I1H6B0r0g5YuFo0w6D3vWSVGJ7i4tkQkZroviW4sPUxXgXEppF-sbp7UWCmffUDVV87uf4KFUKmTJKgo~8Zv4lOdRjHFAxJWo3Gr2WD0VXwvzQnHUYJCk9XbJQ4EHqpG8NX4baQayT7MCEg6mtCgi69Tdo84ejvqZRG4efl98lVLJfkiz4THeESFz1SaTOvkJt05ferKNG9DEsfLL0ELol0lvXDcgyU0SREyMgaqmwFw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactDesktop:  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/uFTzyLgXzTrxiWNd.png?Expires=1804071487&Signature=BhEkgBQ8RumkWN8HRuyL8SHnkwOaQWw6ZAinkVOiTt75txbe4n4xMUeblunxHZAKu11FayJmsuqq7h0Wkuwnx4r1FdxMoKSLYWP~AbAYq5jAzk4p-yRV5ON9ioLHKNiT8zm9v5Dp1dBGWQ7gkRSY4EhOfMC5pCEoB12hZjmbh1jE-mpxh5YI6Eo2zXOCEEGYZZO5RowInPIOQlH5HIwzNu6Y1qAmCUKnXH0Y-99F1~2msVbaRxpoq~elurgTmx5FuUhdS6FEjfMGIdro-SqWCW~WrVSlH63d8yJ1jJUBkDhoNkqHqzFzt5nM3plAhwrUX7i7trRcbUnTTmwlOx8Mlg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactMobile:   "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/WpNKcoosRkqbNvrn.jpg?Expires=1804071487&Signature=s9qsPyfPptblswaZDl5uloo1IGYQ5PSbeKcWbC4tjdaW7O-Vs24WfZKuLgXSLUC3t-kP1Y9U-nNDRmjF1BNhPz9vjiewk8CilLrNZ7zDBsPtL9yR0K~4iQnBn~fnVWHmhs3-OU0P~ap0d5nUjlhdo~PAqltR2Di98WtvqiItzFYB3xsMBLvQymFXt9RYB-eydytTFCyOde8Ii9pPhISI9rYZVcanI8CqZoauVtkY0ItnObJtXVh8EDOcefKjasd8iYpl3IV-FvDMjyukKdvxF-iJ2-1GX7YAP2z2t~QfcoTKSHaI6W08dxmqW53vYEtGbjiKVwrjo4n8hSOJPeN~oQ__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
  r3: {
    card:            "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/DNlSuWdYRROWnmwg.jpg?Expires=1804071487&Signature=mAnOL4-SGCuk5Qs8js1KIbbh1Zfs6QpFDI9umV905n-1im482OJyTYBbptCWbBIoAVtXop9XS9RAFYC2vW3NtqmwemQ3O2nVF2wgmOwNRmMKG0~SSSRBH4DAr-BJZHCJTACUspMp8ouX06FkYXQHjsefF9fEVA2y2h1lPm3sf7w3XNT8kFDqOfaMlBrB-E3Z2P~hdaOy4URVXn2r1dIFoH7eiM8zgtys7zVemMR7lwggmcFj4XntQ~w7jBD~I4QPxX7jDh4JaPVr-CT-ahKw9COWGvVk-UV7ABtp9m4TAb8ssTkd6xVUtGVvwQjZhRgfZaNBMBMC~moS7125SN5RCg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeDesktop:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/MlYWmNgRcxsaMxuZ.jpg?Expires=1804071487&Signature=OpdHTZ1AblxMWRjkF3NdDs5a2--CH99F-rYxDo907Ylxbnsl79cXABsxicBEEmyfEkRVCLpN6fG6igqZELslRNZV44V28e0KJoGSUJSlD1OE92FX--wEwdpCDFQ9Sfdwyy8E8IGiYJWRL64AvFGB1WzIb2m0~LX78WPfBLQb3TzfacBQ~ugrNruIGrNmV3KGu~cUNSDgjQMSEejTfex2bKljndp2ctGUXDy-180up5gUUVFVPL3lMdezEgGMePnJi1d2XNkqdArsbIBV5WhFirj2vgnAnc6KbjGQqs9yxlmQS0C6BMb5XqjGERY6FYHQoyg~xwIllqkKrP5zBZ66vw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeMobile:      "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/CJQSiNozlCAiKIyD.jpg?Expires=1804071487&Signature=oX9R145XrdxMczx~8NMp~Pgj1NYH4XM0RRMa1PlfSWxRUHw7rRCdiGuPiYIHVTP0gZO3DTFMfOVgdNOITaPkdVMUUCTKg4jc5Gkigs9xSlk1Or88yNjErorDcSv2U387Yjee8vOEZ~rHjnlP5ohrLa3nA2CJmh3S9FYD7d8ac~9VXa423DOzQs9NAfOP5xzXemE9wXofH54bk9czxis1kgpJz1czx62vmK4R~KguwmwbArWz3XLgcvZUHN8QWq~4TWMAZ8g2Co8DEXSN1S8eE8YmBuKnutZtu7mDKmGc-ATkBhdSzVRxpq33ibJX3SQmb5XWovfZvtK3rMimpp0qlg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuDesktop:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/OrEcyAgqvRwKwusW.jpg?Expires=1804071487&Signature=okgRPLvO19s81WLy13F9R0AvF6JZx~QgrBpoeWiMP4CxZzr2m3lU7aladrtxujSvduWpO2HNy~pcJhP-J61H1jx6-WwXNrThIP42bvD5ZcbNqqn-cCiGqZjSBVVUYfhP6TVtjPyQiVaNlpnw~WsZrnHthGaaFKcRVryYn~9BLHkSGihKN6XVaz6~3N588c8Jo5U56okO-9vWdgL-2lxNgLbh0A-KLK6kO0EyfBTVAISOQ0TD-DWVUN81iJGas5SjiM2IdroDM-I7njQBEePMMo7giqD9ArskUY0jGSHvD~jlqygEsY0QFsuEGBw0PdQTAl6Ig4YWE5XKitKnunLPZA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuMobile:      "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/mNUEWMmErZqDiyOF.jpg?Expires=1804071487&Signature=JZIEKFaRMg6bKQ3c5NxP9PRKX7YQKWKhFuZAaeJzQRw~0J6vnVxjdf5ZU65BZIUKpfXfNIAzuvL-91Cp2umk1isjhjTgLnFC6ZswE2srYj~HRheYoBlYxla7B0Ws51q1q2aR9bus-wimKUBBM2uTCFtQUmxKiyKAO-an~FCOPiVt2LB-U19zf2QVanCENhYRgmhcGj1eZeAfOkfCD3MDclh0GoS1fwdY6Wybzjh0q8czSUQHkRbxwWy~Pqwsib8Md0kKUJzXvNUwjvaAyP8c5NbAdspUJ2NvW2JOCXPlyjXK5yAY-brKP4m0ELy5oTcQHDD1C4HqMj0YFIUq-CJwgA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactDesktop:  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/CQPSrungAYpEukke.jpg?Expires=1804071487&Signature=eAUW7EnfDXaFAqWUjvFY-5FGxXo35TGuCdudFMVRTp4wiChgPCI99Zj0ELDhUlKVw663Y9CACW-580JqPh28cQDZRzoEqIfxfFnkSyFeF5QtjMjYNhnqrGvARvFgkvzaUoLcxBmKYgVuRv1q5K6NxoWv52pQuI2kyzbqi2jeYTuqsQTo5b~Jd7Stlknr7LtDbor7LsGLw73l5Tzvr24T9jLCimn7Cp~7kbQoEiSthFEN9ItAyGSv9283HLd7b-4J~pSL9q2yacwk73XD8UfZnIt0FVMOcg8qEUoXpNWrWiZP9bKKpDL11Dy9jlz9LF~H8ynHCYxPaxaIdjMYTSQkOA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactMobile:   "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/hDmpIZKzOqPClWZF.jpg?Expires=1804071487&Signature=qct51OXfihNHpUNHjIrU89qG3bpNiuA-7D1V70Cu7b5GqdwMUEJjHjDA5r0yrGvElIECZncERkTf0CeMJ~0MX2mSEpcy-Eq6s0Or3l74eN6IHp40olzIsmnDulyn8rJ8EegR5kwinF2-0Rskx6y-u1vzcf4~AOD-Rdp~FpVvr6mMgM8yni7pqZO4ZUhTc5CqE6xa7Z~NQe4ftBYgyIzzG2XzSmWC2vmRMiAiuqCoj5EudkYmpeJPA58Okz8osbZNoNRr~v18ecwZlULcpvJu-ws-uWdfiMffISJQMK5SYZlOL7y9xe4Ro096HqDtlY~X58rTq3B18SaAtMe8PnghPA__&Key-Pair-Id=K2HSFNDJXOU9YS",
  },
  r4: {
    card:            "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/weSBIVmtIJteqxIt.png?Expires=1804071487&Signature=C0om~vi-7nOkBcJ5jIYnuMd~dabBLMkIx1y6QUUhkAuFYbEKNAfvQlfxeTd0SMfxYFwVolg-LqxmB6EhOboqen~SJob4hjCghckXEROWTJLEhzO0tMeb5W4WlQBeJlFMcjDFgbtuZidjm~UCRiMln9kRb6t-b~yrQQClCdirL~Eh2Lj9uoGvbEoEa9QfCsmM5bKTugaSvZbN1laJco8mcq2UZUrNP0hGBBy10iYvkrCp3KnIlOiw~NlL2hpSJuKuAxniU6I~~dfsT8rAiqeF693OpPwa0dOLArWIh4qq-z46-R2vp314tjULC-pSFjxipoxlaH8WupzLhMcxzsNI5g__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeDesktop:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/aMurEGvOzVOFfVvv.png?Expires=1804071487&Signature=a2K9p6VizNtwpgNeS37W4llxkOuCOEl6ejiilXut6a-GSjeUcd0R~W84FTjivQoiH7hgk8hiiQ--2YtrvgnJFmtWZEvvVDxDFvFHiOaobA7VO5Mtq15JNMslmQAVIhEel8e0~qA03EhPQqUtowayMup2U~70cou0uWrD-jpJdme1pohrltqcURz~DL~HmRO4k-9utQZ24hlPJ9KyPST5VJXWce0pPEvFgeg8js2bb8fugL7gEGnWkUsjQ7mbBgyholzJziaPYAAK-nckIs94huL4yevYN-sf2Mbt1Wso3zJwoLtkUbsI2Wq7doh26Ybm-8xk4JvkDSsEGrPoO9cM5Q__&Key-Pair-Id=K2HSFNDJXOU9YS",
    homeMobile:      "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/dNChTmcnJtmrWFbo.jpg?Expires=1804071487&Signature=FKRTBHNequhP3iOaZHL1hVXHjeWFEYHdTBN7b6tz1mzGEpuiLk9frZsQFbXePxx40ArBbfwAndP0fkt3q~Kc6DXi3JpD7JTDjK51xekn5tAJ6fc3VswyVPBAYcY0-ObEH8tyysfHK4cGqbXMASZs1lD8HFebA2usiJkw749XMRK4OJ~zGqXOupV8MjPY2HEHAEJdLKX8OQUVzaQ1qTbKMHGD1hj~prIbrLiCxhvcPXxVi8DVB~PWDnn4DNTawJ2jl2jtXSy2pGpBmRa0tAxLTJGD~fgsGMQQaO9SxBHOcQmTN2vfZm1Ne6mrNDbRhXPDteO-gT2185z~-5bdwfHMCA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuDesktop:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/wGIiwBLptwbgVdeC.jpg?Expires=1804071487&Signature=DLSLoJ1S7qf-Vx4sIveKDh3eXPJ8lsowGCBP-qToBabfcJS9yVfCjzA7XI1xvM8SoqiUDFQ0jZo8J9pIgE8DdOWZhZ1V9-8cMbhdNLHpoDh73yDSJdDfhC1JUg-XSuDANntgwxG3YRPwEowIrBYjqCc5ALNCQDXgykbTWmxKU76TbuZGTLgPQRDKxvfGQEmaIXIST-N3PET-ioP97GwUwGacjWQ3jL4Vf87PwUv7EksDX97H2l0t97rxumQ~t-0GctbQvfBpl5wC0hV18Zz16V70A8G2NDEDffanZNrKEPh0najZcgo-u-x9imI5R8xSSUKnGU1q15ayk1c4h4ynIQ__&Key-Pair-Id=K2HSFNDJXOU9YS",
    menuMobile:      "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/mUwKjINTrmqsEKAj.jpg?Expires=1804071487&Signature=tg~AOm1~2ytczeguDfc-NYzB-HXQJDTvb3PlnyN-19gWi8Ay8rur6hKn2-Xl6ajnFCIXKgGScvpTH4G7THmHzeII~GAwoRVNk8VxMybioTH5im~ocasMbQeXKS0G8BVo88FXt9wak5iAza32UmPVzQYSTX3s53zUgB~mhx57l~aAK3Go38ymJTxH~h1yZv9bXBOp5jEZbAz~ZXYfH0wBLhgonxUXBMxOO9P1VORggQEgSgfsjIebEp5jVJSmU7ItFCUWyOmeS0Wm62yKBzBQSiOrj8rCl8mjjfZsjaPYPB9dLKIqZB8qsMMo4CnjrfAZz35~aDP8AqgiALi3Ib8xnw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactDesktop:  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/CzZgQZWfINhMMzEJ.jpg?Expires=1804071487&Signature=ZlP80W2CDqd~9xbUP2Hm4OIU5n8-kcbGrXFa1AUeFqP-0CUplvFo1VcseBRqW5N5WOsQZHUUvhIAZ3Hy8sE~I0njyXX83ng~2gx0yCqPP2TS2a011c~T8r7Tm4J90QdvlcOU4RlGIKZDIELL8Kz7n2zh-5IDweOVaW50~pfhP102ghVpNuedFqKbsbR2LlZa~cIrGZtaeee8MUGxZypAAkOryYtKr-qiAl8zNuch~6DLRzr7u5pYEVNDmaa~JajrbPGOPF2sX3E6m4NaF5HmkM6BB1wwh8SMap9R9SCVCD3NMIVELJwFW1oDkYU17SDDBoegfBgUsJgw1PENn4pXRw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    contactMobile:   "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/cGCbVHnEZhfILdqo.png?Expires=1804071487&Signature=QWrXkra-5CCZU3GHbikxupZLen8yJw1QA3RvEy6aLU~ROMqyfVrswkYQKK-JWXeRow62Vcga2pdQWMRDS3HHyqNeOuCe~vFLFp-UfKzWLV4XHJ2QUVML21CeFSO0-c-eQMJ5bq~PmfoVHiQQSoL~3WMCJnV6By-U09tWtG7X7S8RaJD6w~kKPaR0MTaMz5IChwuqFCIghtnKOTQDNM6gC8lua92TzwgUu4voDjiAz2iBWyquUAUoFrBZ5OmXfWolO6XsdSmfXTrTW6pFKeVstOL1aVvFLOlGRNONmy2VRKaD7aDNjo3gxSLx-dxhF3yfw2EgDp4wxM30Vb~nsNuj7A__&Key-Pair-Id=K2HSFNDJXOU9YS",
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
