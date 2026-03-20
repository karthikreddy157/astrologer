import { useState, useEffect, useContext, createContext, useRef } from "react";

// ─────────────────────────────────────────────
// i18n SERVICE
// ─────────────────────────────────────────────
const translations = {
  en: {
    lang: "EN", langFull: "English",
    nav: { about:"About", services:"Services", book:"Book", connect:"Connect", admin:"Admin", login:"Login", logout:"Logout", bookNow:"Book Now" },
    hero: { om:"ॐ", sanskrit:"यथा पिण्डे तथा ब्रह्माण्डे", title1:"Ancient Stars,", title2:"Divine Guidance", sub:"Rooted in the timeless wisdom of Vedic Jyotisha, illuminating your path through birth charts, remedies, Tarot, Vastu, and Numerology.", b1:"🌿 Vedic Jyotisha", b2:"🃏 Tarot & Numerology", b3:"🏠 Vastu Shastra", b4:"🔮 Divine Remedies", cta1:"📅 Book Appointment", cta2:"View Services" },
    stats: { s1:"20+", l1:"Years of Practice", s2:"5,000+", l2:"Consultations", s3:"12", l3:"States Covered", s4:"98%", l4:"Satisfied Clients" },
    about: { tag:"About the Acharya", title:"A Life Devoted to the Sacred Science", icon:"🪔", name:"Jyotish Acharya", sub:"Vedic Astrologer · Spiritual Counsellor", h2:"Guided by the Grahas", tagline:'"The planets do not compel — they impel."', p1:"With over 20 years of immersion in Vedic Jyotisha, I have dedicated my life to helping souls navigate their earthly journey with clarity, confidence, and divine grace.", p2:"Trained under revered masters in Varanasi, holding ICAS certification. Practice blends Parashari & Jaimini systems with Tarot, Lal Kitab, Vastu & Numerology.", cert1:"Certified by Indian Council of Astrological Sciences (ICAS)", cert2:"Trained in Parashari, Jaimini & KP systems", cert3:"Vastu Shastra practitioner — residential & commercial", cert4:"Lal Kitab remedies & Gemstone recommendations", note:"🌿 All remedies are simple, cost-effective, and grounded in traditional Shastra — no expensive rituals." },
    services: { tag:"Sacred Services", title:"What I Offer", desc:"Each consultation is personalised to your unique chart. Online and in-person sessions available.", s:[{icon:"🌟",name:"Kundali / Birth Chart",desc:"Comprehensive natal chart — all 12 houses, dashas, yogas, doshas and karmic purpose.",price:"₹1,500",dur:"60 min"},{icon:"🃏",name:"Tarot Card Reading",desc:"Sacred Tarot guidance on love, career, family or health. Compassionate readings.",price:"₹800",dur:"45 min"},{icon:"🔢",name:"Numerology Report",desc:"Life path, destiny, soul urge numbers decoded. Name correction included.",price:"₹600",dur:"Written report"},{icon:"🏠",name:"Vastu Consultation",desc:"Harmonise home or office with Vedic directional science. Low-cost remedies.",price:"₹2,000",dur:"90 min"},{icon:"💑",name:"Kundali Milan",desc:"Traditional Ashtakoot compatibility + Mangal & Nadi analysis for marriage.",price:"₹1,200",dur:"48 hr report"},{icon:"🌿",name:"Remedies & Gemstones",desc:"Personalised Lal Kitab remedies, mantras, gemstone selection from your chart.",price:"₹700",dur:"30 min"}] },
    booking: { tag:"Book Appointment", title:"Begin Your Consultation", desc:"Fill in your details. I will confirm your appointment within 24 hours.", cardTitle:"Appointment Request Form", cardSub:"All information is strictly confidential · * required", sec1:"👤 Personal Details", sec2:"📋 Service & Schedule", sec3:"🙏 Your Question", fname:"Full Name *", dob:"Date of Birth *", tob:"Time of Birth", pob:"Place of Birth *", phone:"WhatsApp / Phone *", email:"Email *", service:"Service Required *", prefDate:"Preferred Date", prefTime:"Preferred Time", mode:"Mode", question:"What guidance do you seek?", upload:"Upload Kundali / Documents (Optional)", submit:"🙏 Submit Request 🙏", success:"Pranaam! Your request has been received. I will contact you within 24 hours. 🙏", services:["Kundali / Birth Chart Reading – ₹1,500","Tarot Card Reading – ₹800","Numerology Report – ₹600","Vastu Shastra Consultation – ₹2,000","Kundali Milan (Matching) – ₹1,200","Remedies & Gemstone Advice – ₹700"], modes:["In-Person (Bengaluru)","Video Call (Zoom)","Phone Call","Written Report by Email"], times:["Morning: 9 AM – 12 PM","Afternoon: 12 PM – 4 PM","Evening: 4 PM – 8 PM"] },
    testimonials: { tag:"Client Experiences", title:"Words from the Seekers", desc:"Thousands of lives touched across India and beyond.", items:[{stars:5,text:"The Kundali reading was astonishingly accurate. Within three months of the remedy, I received my long-awaited promotion.",name:"Priya Malhotra",loc:"Delhi · Birth Chart Reading"},{stars:5,text:"We consulted for Kundali matching. Acharya ji explained everything patiently and the marriage has been blissful.",name:"Suresh & Meena Iyer",loc:"Chennai · Kundali Milan"},{stars:5,text:"The Vastu consultation for my shop changed everything. Business footfall doubled in two months.",name:"Rajesh Sharma",loc:"Bengaluru · Vastu Consultation"}] },
    connect: { tag:"Connect & Pay", title:"Reach Me & Make Payment", social:"📡 Connect on Social Media", pay:"💳 Make Payment via UPI", items:[{e:"💬",n:"WhatsApp",h:"+91 99999 99999 · Direct messaging",url:"https://wa.me/919999999999"},{e:"📸",n:"Instagram",h:"@jyotishacharya · Daily cosmic tips",url:"#"},{e:"▶️",n:"YouTube",h:"@JyotishAcharya · Weekly forecasts",url:"#"},{e:"🌐",n:"Facebook",h:"Jyotish Acharya · Community",url:"#"},{e:"✉️",n:"Email",h:"guru@jyotishacharya.com",url:"mailto:guru@jyotishacharya.com"}], upiId:"jyotishacharya@upi", payDesc:"Select amount and scan QR code with any UPI app.", payNote:"After payment, send screenshot to WhatsApp with name and service booked. 🙏", amounts:["₹600","₹700","₹800","₹1,200","₹1,500","₹2,000"] },
    admin: { tag:"Astrologer Dashboard", title:"Client Appointment Requests", desc:"All submissions from seekers. Manage your schedule here.", panelTitle:"🪔 Booking Requests", all:"All", newS:"New", confirmed:"Confirmed", done:"Done", clearAll:"Clear All", empty:"No appointments yet.", confirmBtn:"✓ Confirm", doneBtn:"✓ Done", delBtn:"✕", cols:["#","Name & Contact","Birth Details","Service","Appointment","Question","Docs","Status","Actions"] },
    login: { title:"Astrologer Login", sub:"Admin access only", email:"Email Address", pass:"Password", btn:"Sign In", forgot:"Forgot password?", error:"Invalid credentials. Use admin@jyotish.com / admin123", demo:"Demo: admin@jyotish.com / admin123" },
    footer: { tagline:"Vedic Astrologer & Spiritual Guide · Bengaluru, India", copy:"© 2026 Jyotish Acharya. All rights reserved.", disclaimer:"Astrology is a spiritual guide. Consultations are for informational purposes only." },
    theme: { light:"☀️ Light", dark:"🌙 Dark", night:"🌌 Night" },
  },
  hi: {
    lang: "हि", langFull: "हिन्दी",
    nav: { about:"परिचय", services:"सेवाएं", book:"बुकिंग", connect:"संपर्क", admin:"प्रशासन", login:"लॉगिन", logout:"लॉगआउट", bookNow:"अभी बुक करें" },
    hero: { om:"ॐ", sanskrit:"यथा पिण्डे तथा ब्रह्माण्डे", title1:"प्राचीन सितारे,", title2:"दिव्य मार्गदर्शन", sub:"वैदिक ज्योतिष की कालातीत ज्ञान में निहित, कुंडली, उपाय, टैरो, वास्तु और अंकज्योतिष के माध्यम से आपका मार्ग प्रकाशित करता हूँ।", b1:"🌿 वैदिक ज्योतिष", b2:"🃏 टैरो और अंकज्योतिष", b3:"🏠 वास्तु शास्त्र", b4:"🔮 दिव्य उपाय", cta1:"📅 अपॉइंटमेंट बुक करें", cta2:"सेवाएं देखें" },
    stats: { s1:"20+", l1:"वर्षों का अनुभव", s2:"5,000+", l2:"परामर्श", s3:"12", l3:"राज्य", s4:"98%", l4:"संतुष्ट ग्राहक" },
    about: { tag:"आचार्य के बारे में", title:"पवित्र विज्ञान को समर्पित जीवन", icon:"🪔", name:"ज्योतिष आचार्य", sub:"वैदिक ज्योतिषी · आध्यात्मिक सलाहकार", h2:"ग्रहों द्वारा निर्देशित", tagline:'"ग्रह मजबूर नहीं करते — वे प्रेरित करते हैं।"', p1:"वैदिक ज्योतिष में 20 वर्षों से अधिक के साथ, मैंने अपना जीवन आत्माओं को उनकी सांसारिक यात्रा में मार्गदर्शन देने के लिए समर्पित किया है।", p2:"वाराणसी के आचार्यों के अधीन प्रशिक्षित, ICAS प्रमाणित। पाराशरी और जैमिनी प्रणालियों के साथ टैरो, लाल किताब और वास्तु का मिश्रण।", cert1:"भारतीय ज्योतिष विज्ञान परिषद (ICAS) द्वारा प्रमाणित", cert2:"पाराशरी, जैमिनी और KP प्रणालियों में प्रशिक्षित", cert3:"वास्तु शास्त्र प्रैक्टिशनर", cert4:"लाल किताब उपाय और रत्न अनुशंसाएं", note:"🌿 सभी उपाय सरल, किफायती और पारंपरिक शास्त्र पर आधारित हैं।" },
    services: { tag:"पवित्र सेवाएं", title:"मेरी सेवाएं", desc:"प्रत्येक परामर्श आपकी अनूठी कुंडली के अनुसार व्यक्तिगत है।", s:[{icon:"🌟",name:"कुंडली विश्लेषण",desc:"सभी 12 भाव, दशा, योग और कर्म उद्देश्य का व्यापक विश्लेषण।",price:"₹1,500",dur:"60 मिनट"},{icon:"🃏",name:"टैरो कार्ड रीडिंग",desc:"प्रेम, करियर, परिवार या स्वास्थ्य पर पवित्र टैरो मार्गदर्शन।",price:"₹800",dur:"45 मिनट"},{icon:"🔢",name:"अंकज्योतिष रिपोर्ट",desc:"जीवन पथ, भाग्य और आत्मा की इच्छा संख्याएं डीकोड।",price:"₹600",dur:"लिखित रिपोर्ट"},{icon:"🏠",name:"वास्तु परामर्श",desc:"वैदिक दिशा विज्ञान से घर या कार्यालय सामंजस्य।",price:"₹2,000",dur:"90 मिनट"},{icon:"💑",name:"कुंडली मिलान",desc:"विवाह के लिए अष्टकूट अनुकूलता और मंगल दोष विश्लेषण।",price:"₹1,200",dur:"48 घंटे"},{icon:"🌿",name:"उपाय और रत्न",desc:"व्यक्तिगत लाल किताब उपाय और रत्न चयन।",price:"₹700",dur:"30 मिनट"}] },
    booking: { tag:"अपॉइंटमेंट बुक करें", title:"परामर्श शुरू करें", desc:"अपना विवरण भरें। मैं 24 घंटे में पुष्टि करूंगा।", cardTitle:"अपॉइंटमेंट अनुरोध फॉर्म", cardSub:"सभी जानकारी गोपनीय है · * आवश्यक", sec1:"👤 व्यक्तिगत विवरण", sec2:"📋 सेवा और समय-सारणी", sec3:"🙏 आपका प्रश्न", fname:"पूरा नाम *", dob:"जन्म तिथि *", tob:"जन्म समय", pob:"जन्म स्थान *", phone:"WhatsApp / फोन *", email:"ईमेल *", service:"आवश्यक सेवा *", prefDate:"पसंदीदा तिथि", prefTime:"पसंदीदा समय", mode:"परामर्श माध्यम", question:"आप क्या जानना चाहते हैं?", upload:"कुंडली / दस्तावेज अपलोड करें (वैकल्पिक)", submit:"🙏 अनुरोध जमा करें 🙏", success:"प्रणाम! आपका अनुरोध प्राप्त हो गया। मैं 24 घंटे में संपर्क करूंगा। 🙏", services:["कुंडली विश्लेषण – ₹1,500","टैरो रीडिंग – ₹800","अंकज्योतिष रिपोर्ट – ₹600","वास्तु परामर्श – ₹2,000","कुंडली मिलान – ₹1,200","उपाय और रत्न – ₹700"], modes:["व्यक्तिगत (बेंगलुरु)","वीडियो कॉल (Zoom)","फोन कॉल","ईमेल द्वारा रिपोर्ट"], times:["सुबह: 9 AM – 12 PM","दोपहर: 12 PM – 4 PM","शाम: 4 PM – 8 PM"] },
    testimonials: { tag:"ग्राहक अनुभव", title:"साधकों के शब्द", desc:"भारत और विदेश में हजारों जीवन प्रभावित।", items:[{stars:5,text:"कुंडली रीडिंग अद्भुत रूप से सटीक थी। उपाय के तीन महीने बाद मुझे प्रतीक्षित पदोन्नति मिली।",name:"प्रिया मल्होत्रा",loc:"दिल्ली · कुंडली विश्लेषण"},{stars:5,text:"कुंडली मिलान के लिए परामर्श किया। विवाह आनंदमय रहा है।",name:"सुरेश और मीना अय्यर",loc:"चेन्नई · कुंडली मिलान"},{stars:5,text:"दुकान के लिए वास्तु परामर्श ने सब बदल दिया। दो महीनों में ग्राहक दोगुने हो गए।",name:"राजेश शर्मा",loc:"बेंगलुरु · वास्तु परामर्श"}] },
    connect: { tag:"संपर्क और भुगतान", title:"मुझसे संपर्क करें", social:"📡 सोशल मीडिया पर जुड़ें", pay:"💳 UPI से भुगतान करें", items:[{e:"💬",n:"WhatsApp",h:"+91 99999 99999",url:"https://wa.me/919999999999"},{e:"📸",n:"Instagram",h:"@jyotishacharya",url:"#"},{e:"▶️",n:"YouTube",h:"@JyotishAcharya",url:"#"},{e:"🌐",n:"Facebook",h:"Jyotish Acharya",url:"#"},{e:"✉️",n:"ईमेल",h:"guru@jyotishacharya.com",url:"mailto:guru@jyotishacharya.com"}], upiId:"jyotishacharya@upi", payDesc:"राशि चुनें और UPI ऐप से QR स्कैन करें।", payNote:"भुगतान के बाद नाम और सेवा के साथ स्क्रीनशॉट WhatsApp करें। 🙏", amounts:["₹600","₹700","₹800","₹1,200","₹1,500","₹2,000"] },
    admin: { tag:"आचार्य डैशबोर्ड", title:"ग्राहक अपॉइंटमेंट अनुरोध", desc:"सभी साधकों के अनुरोध।", panelTitle:"🪔 बुकिंग अनुरोध", all:"सभी", newS:"नए", confirmed:"पुष्टि", done:"पूर्ण", clearAll:"सभी हटाएं", empty:"अभी कोई अपॉइंटमेंट नहीं।", confirmBtn:"✓ पुष्टि", doneBtn:"✓ पूर्ण", delBtn:"✕", cols:["#","नाम","जन्म विवरण","सेवा","अपॉइंटमेंट","प्रश्न","दस्तावेज","स्थिति","कार्य"] },
    login: { title:"आचार्य लॉगिन", sub:"केवल प्रशासन हेतु", email:"ईमेल पता", pass:"पासवर्ड", btn:"साइन इन", forgot:"पासवर्ड भूल गए?", error:"गलत क्रेडेंशियल।", demo:"डेमो: admin@jyotish.com / admin123" },
    footer: { tagline:"वैदिक ज्योतिषी · बेंगलुरु, भारत", copy:"© 2026 ज्योतिष आचार्य। सर्वाधिकार सुरक्षित।", disclaimer:"ज्योतिष एक आध्यात्मिक मार्गदर्शन है।" },
    theme: { light:"☀️ प्रकाश", dark:"🌙 अंधकार", night:"🌌 रात्रि" },
  },
  ta: {
    lang: "த", langFull: "தமிழ்",
    nav: { about:"பற்றி", services:"சேவைகள்", book:"முன்பதிவு", connect:"தொடர்பு", admin:"நிர்வாகம்", login:"உள்நுழைவு", logout:"வெளியேறு", bookNow:"இப்போது பதிவு" },
    hero: { om:"ॐ", sanskrit:"யதா பிண்டே ததா பிரம்மாண்டே", title1:"பண்டைய நட்சத்திரங்கள்,", title2:"தெய்வீக வழிகாட்டுதல்", sub:"வேத ஜோதிட ஞானத்தில் வேரூன்றி, ஜன்ம குண்டலி, தாரோ, வாஸ்து மற்றும் எண்கணிதம் மூலம் உங்கள் பாதையை ஒளிரச் செய்கிறேன்.", b1:"🌿 வேத ஜோதிடம்", b2:"🃏 தாரோ & எண்கணிதம்", b3:"🏠 வாஸ்து சாஸ்திரம்", b4:"🔮 தெய்வீக தீர்வுகள்", cta1:"📅 முன்பதிவு செய்யுங்கள்", cta2:"சேவைகளை காண்க" },
    stats: { s1:"20+", l1:"ஆண்டு அனுபவம்", s2:"5,000+", l2:"ஆலோசனைகள்", s3:"12", l3:"மாநிலங்கள்", s4:"98%", l4:"திருப்தியான வாடிக்கையாளர்கள்" },
    about: { tag:"ஆச்சார்யர் பற்றி", title:"புனித அறிவியலுக்கு அர்ப்பணிக்கப்பட்ட வாழ்க்கை", icon:"🪔", name:"ஜோதிஷ் ஆச்சார்யர்", sub:"வேத ஜோதிடர் · ஆன்மீக ஆலோசகர்", h2:"கிரகங்களால் வழிநடத்தப்பட்டவர்", tagline:'"கிரகங்கள் கட்டாயப்படுத்துவதில்லை — அவை ஊக்கமளிக்கின்றன।"', p1:"வேத ஜோதிடத்தில் 20+ ஆண்டுகள் ஈடுபட்டு, உயிர்களின் வாழ்க்கையை வழிநடத்தவே என் வாழ்க்கையை அர்ப்பணித்துள்ளேன்.", p2:"வாரணாசியில் குருவின் கீழ் பயிற்சி பெற்றவர், ICAS சான்றிதழ் பெற்றவர்.", cert1:"இந்திய ஜோதிட அறிவியல் கவுன்சில் சான்றிதழ்", cert2:"பராஷரி, ஜைமினி & KP முறைகளில் பயிற்சி", cert3:"வாஸ்து சாஸ்திர நிபுணர்", cert4:"லால் கிதாப் தீர்வுகள் & ரத்தின பரிந்துரை", note:"🌿 அனைத்து தீர்வுகளும் எளிமையானவை மற்றும் சாஸ்திர அடிப்படையிலானவை." },
    services: { tag:"புனித சேவைகள்", title:"என் சேவைகள்", desc:"ஒவ்வொரு ஆலோசனையும் உங்கள் குண்டலிக்கு தனிப்பட்டது.", s:[{icon:"🌟",name:"குண்டலி பகுப்பாய்வு",desc:"12 வீடுகள், தசா, யோகங்கள் மற்றும் கர்ம நோக்கம் பகுப்பாய்வு.",price:"₹1,500",dur:"60 நிமிடம்"},{icon:"🃏",name:"தாரோ கார்டு ரீடிங்",desc:"காதல், தொழில், குடும்பம் அல்லது உடல்நலனில் தாரோ வழிகாட்டல்.",price:"₹800",dur:"45 நிமிடம்"},{icon:"🔢",name:"எண்கணித அறிக்கை",desc:"வாழ்க்கை பாதை, விதி எண்கள் மற்றும் பெயர் திருத்தம்.",price:"₹600",dur:"எழுத்து அறிக்கை"},{icon:"🏠",name:"வாஸ்து ஆலோசனை",desc:"வேத திசை அறிவியலால் வீடு அல்லது அலுவலகத்தை சீரமைக்கவும்.",price:"₹2,000",dur:"90 நிமிடம்"},{icon:"💑",name:"குண்டலி பொருத்தம்",desc:"திருமண அஷ்டகூட பொருத்தம் மற்றும் மங்கள் தோஷ பகுப்பாய்வு.",price:"₹1,200",dur:"48 மணி"},{icon:"🌿",name:"தீர்வுகள் & ரத்தினங்கள்",desc:"தனிப்பட்ட லால் கிதாப் தீர்வுகள் மற்றும் ரத்தின தேர்வு.",price:"₹700",dur:"30 நிமிடம்"}] },
    booking: { tag:"முன்பதிவு", title:"ஆலோசனை தொடங்குங்கள்", desc:"உங்கள் விவரங்களை நிரப்புங்கள். 24 மணி நேரத்தில் உறுதிப்படுத்துவேன்.", cardTitle:"முன்பதிவு படிவம்", cardSub:"அனைத்தும் இரகசியமானது · * கட்டாயம்", sec1:"👤 தனிப்பட்ட விவரங்கள்", sec2:"📋 சேவை & அட்டவணை", sec3:"🙏 உங்கள் கேள்வி", fname:"முழு பெயர் *", dob:"பிறந்த தேதி *", tob:"பிறந்த நேரம்", pob:"பிறந்த இடம் *", phone:"WhatsApp / தொலைபேசி *", email:"மின்னஞ்சல் *", service:"தேவையான சேவை *", prefDate:"விரும்பிய தேதி", prefTime:"விரும்பிய நேரம்", mode:"ஆலோசனை முறை", question:"நீங்கள் என்ன தெரிந்துகொள்ள விரும்புகிறீர்கள்?", upload:"குண்டலி / ஆவணங்கள் பதிவேற்றவும் (விருப்பமானது)", submit:"🙏 விண்ணப்பம் சமர்ப்பிக்கவும் 🙏", success:"வணக்கம்! உங்கள் விண்ணப்பம் பெறப்பட்டது. 24 மணி நேரத்தில் தொடர்பு கொள்வேன். 🙏", services:["குண்டலி பகுப்பாய்வு – ₹1,500","தாரோ ரீடிங் – ₹800","எண்கணித அறிக்கை – ₹600","வாஸ்து ஆலோசனை – ₹2,000","குண்டலி பொருத்தம் – ₹1,200","தீர்வுகள் & ரத்தினங்கள் – ₹700"], modes:["நேரில் (பெங்களூரு)","வீடியோ அழைப்பு","தொலைபேசி","மின்னஞ்சல் அறிக்கை"], times:["காலை: 9 AM – 12 PM","மதியம்: 12 PM – 4 PM","மாலை: 4 PM – 8 PM"] },
    testimonials: { tag:"வாடிக்கையாளர் அனுபவங்கள்", title:"தேடுபவர்களின் வார்த்தைகள்", desc:"இந்தியா மற்றும் வெளிநாடுகளில் ஆயிரக்கணக்கான உயிர்கள் தொட்டவர்.", items:[{stars:5,text:"குண்டலி ரீடிங் ஆச்சரியமான துல்லியமாக இருந்தது. மூன்று மாதங்களில் எனக்கு பதவி உயர்வு கிடைத்தது.",name:"பிரியா மல்ஹோத்ரா",loc:"டெல்லி · குண்டலி பகுப்பாய்வு"},{stars:5,text:"குண்டலி பொருத்தத்திற்கு ஆலோசனை கேட்டோம். திருமணம் பேரானந்தமாக உள்ளது.",name:"சுரேஷ் & மீனா அய்யர்",loc:"சென்னை · குண்டலி பொருத்தம்"},{stars:5,text:"கடையின் வாஸ்து ஆலோசனை எல்லாவற்றையும் மாற்றியது. இரண்டு மாதங்களில் வாடிக்கையாளர்கள் இரட்டிப்பானார்கள்.",name:"ராஜேஷ் சர்மா",loc:"பெங்களூரு · வாஸ்து ஆலோசனை"}] },
    connect: { tag:"தொடர்பு & கட்டணம்", title:"என்னை தொடர்பு கொள்ளுங்கள்", social:"📡 சமூக ஊடகங்களில் இணையுங்கள்", pay:"💳 UPI மூலம் கட்டணம்", items:[{e:"💬",n:"WhatsApp",h:"+91 99999 99999",url:"https://wa.me/919999999999"},{e:"📸",n:"Instagram",h:"@jyotishacharya",url:"#"},{e:"▶️",n:"YouTube",h:"@JyotishAcharya",url:"#"},{e:"🌐",n:"Facebook",h:"Jyotish Acharya",url:"#"},{e:"✉️",n:"மின்னஞ்சல்",h:"guru@jyotishacharya.com",url:"mailto:guru@jyotishacharya.com"}], upiId:"jyotishacharya@upi", payDesc:"தொகை தேர்ந்தெடுத்து UPI ஆப் மூலம் QR ஸ்கேன் செய்யவும்.", payNote:"கட்டணம் செலுத்திய பிறகு WhatsApp-ல் ஸ்கிரீன்ஷாட் அனுப்புங்கள். 🙏", amounts:["₹600","₹700","₹800","₹1,200","₹1,500","₹2,000"] },
    admin: { tag:"ஆச்சார்யர் டாஷ்போர்டு", title:"வாடிக்கையாளர் முன்பதிவு கோரிக்கைகள்", desc:"அனைத்து விண்ணப்பங்களும்.", panelTitle:"🪔 முன்பதிவு கோரிக்கைகள்", all:"அனைத்தும்", newS:"புதியது", confirmed:"உறுதி", done:"முடிந்தது", clearAll:"அனைத்தையும் அழி", empty:"இன்னும் முன்பதிவு இல்லை.", confirmBtn:"✓ உறுதி", doneBtn:"✓ முடிந்தது", delBtn:"✕", cols:["#","பெயர்","பிறப்பு விவரம்","சேவை","முன்பதிவு","கேள்வி","ஆவணங்கள்","நிலை","செயல்கள்"] },
    login: { title:"ஆச்சார்யர் உள்நுழைவு", sub:"நிர்வாக அணுகல் மட்டும்", email:"மின்னஞ்சல்", pass:"கடவுச்சொல்", btn:"உள்நுழைய", forgot:"கடவுச்சொல் மறந்தீர்களா?", error:"தவறான நற்சான்றிதழ்கள்.", demo:"டெமோ: admin@jyotish.com / admin123" },
    footer: { tagline:"வேத ஜோதிடர் · பெங்களூரு, இந்தியா", copy:"© 2026 ஜோதிஷ் ஆச்சார்யர். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.", disclaimer:"ஜோதிடம் ஒரு ஆன்மீக வழிகாட்டி." },
    theme: { light:"☀️ ஒளி", dark:"🌙 இருட்டு", night:"🌌 இரவு" },
  },
  te: {
    lang: "తె", langFull: "తెలుగు",
    nav: { about:"గురించి", services:"సేవలు", book:"బుకింగ్", connect:"సంప్రదించు", admin:"అడ్మిన్", login:"లాగిన్", logout:"లాగవుట్", bookNow:"ఇప్పుడే బుక్ చేయండి" },
    hero: { om:"ॐ", sanskrit:"యథా పిండే తథా బ్రహ్మాండే", title1:"పురాతన నక్షత్రాలు,", title2:"దివ్య మార్గదర్శకత్వం", sub:"వేద జ్యోతిష జ్ఞానంలో మూలపడి, జన్మ కుండలి, తారో, వాస్తు మరియు సంఖ్యాశాస్త్రం ద్వారా మీ మార్గాన్ని వెలిగిస్తాను.", b1:"🌿 వేద జ్యోతిష్యం", b2:"🃏 తారో & సంఖ్యాశాస్త్రం", b3:"🏠 వాస్తు శాస్త్రం", b4:"🔮 దివ్య పరిహారాలు", cta1:"📅 అపాయింట్మెంట్ బుక్ చేయండి", cta2:"సేవలు చూడండి" },
    stats: { s1:"20+", l1:"సంవత్సరాల అనుభవం", s2:"5,000+", l2:"సంప్రదింపులు", s3:"12", l3:"రాష్ట్రాలు", s4:"98%", l4:"సంతృప్తి చెందిన వినియోగదారులు" },
    about: { tag:"ఆచార్యుల గురించి", title:"పవిత్ర శాస్త్రానికి అంకితమైన జీవితం", icon:"🪔", name:"జ్యోతిష్ ఆచార్య", sub:"వేద జ్యోతిష్కుడు · ఆధ్యాత్మిక సలహాదారు", h2:"గ్రహాల చేత నిర్దేశించబడిన వ్యక్తి", tagline:'"గ్రహాలు బలవంతం చేయవు — అవి స్ఫూర్తినిస్తాయి।"', p1:"వేద జ్యోతిష్యంలో 20+ సంవత్సరాలు, ఆత్మల జీవన ప్రయాణంలో మార్గదర్శకత్వం కోసం నా జీవితాన్ని అంకితం చేశాను.", p2:"వారణాసిలో గురువుల దగ్గర శిక్షణ పొందిన వ్యక్తి, ICAS సర్టిఫికేట్ కలిగినవారు.", cert1:"భారతీయ జ్యోతిష్య విజ్ఞాన మండలి సర్టిఫికేట్", cert2:"పారాశరి, జైమిని & KP వ్యవస్థలలో శిక్షణ", cert3:"వాస్తు శాస్త్ర నిపుణుడు", cert4:"లాల్ కితాబ్ పరిహారాలు & రత్న సిఫార్సులు", note:"🌿 అన్ని పరిహారాలు సరళంగా, సంప్రదాయ శాస్త్రం ఆధారంగా ఉంటాయి." },
    services: { tag:"పవిత్ర సేవలు", title:"నేను అందించేవి", desc:"ప్రతి సంప్రదింపు మీ ప్రత్యేక కుండలికి అనుగుణంగా ఉంటుంది.", s:[{icon:"🌟",name:"కుండలి విశ్లేషణ",desc:"12 భావాలు, దశలు, యోగాలు మరియు కర్మ ప్రయోజనం.",price:"₹1,500",dur:"60 నిమిషాలు"},{icon:"🃏",name:"తారో కార్డు రీడింగ్",desc:"ప్రేమ, కెరీర్, కుటుంబం లేదా ఆరోగ్యంలో తారో మార్గదర్శకత్వం.",price:"₹800",dur:"45 నిమిషాలు"},{icon:"🔢",name:"సంఖ్యాశాస్త్ర నివేదిక",desc:"జీవన మార్గం, విధి సంఖ్యలు డీకోడ్ చేయబడతాయి.",price:"₹600",dur:"లిఖిత నివేదిక"},{icon:"🏠",name:"వాస్తు సంప్రదింపు",desc:"వేద దిశా శాస్త్రంతో ఇల్లు లేదా కార్యాలయం సమన్వయం.",price:"₹2,000",dur:"90 నిమిషాలు"},{icon:"💑",name:"కుండలి మిలాన్",desc:"వివాహానికి అష్టకూట అనుకూలత & మాంగళ్య దోష విశ్లేషణ.",price:"₹1,200",dur:"48 గంటలు"},{icon:"🌿",name:"పరిహారాలు & రత్నాలు",desc:"వ్యక్తిగత లాల్ కితాబ్ పరిహారాలు & రత్న ఎంపిక.",price:"₹700",dur:"30 నిమిషాలు"}] },
    booking: { tag:"అపాయింట్మెంట్ బుక్ చేయండి", title:"సంప్రదింపు ప్రారంభించండి", desc:"మీ వివరాలు నమోదు చేయండి. 24 గంటల్లో నిర్ధారిస్తాను.", cardTitle:"అపాయింట్మెంట్ అభ్యర్థన ఫారం", cardSub:"అన్ని సమాచారం రహస్యంగా ఉంటుంది · * తప్పనిసరి", sec1:"👤 వ్యక్తిగత వివరాలు", sec2:"📋 సేవ & షెడ్యూల్", sec3:"🙏 మీ ప్రశ్న", fname:"పూర్తి పేరు *", dob:"జన్మ తేదీ *", tob:"జన్మ సమయం", pob:"జన్మ స్థలం *", phone:"WhatsApp / ఫోన్ *", email:"ఇమెయిల్ *", service:"అవసరమైన సేవ *", prefDate:"ఇష్టమైన తేదీ", prefTime:"ఇష్టమైన సమయం", mode:"సంప్రదింపు విధానం", question:"మీకు ఏ మార్గదర్శకత్వం కావాలి?", upload:"కుండలి / పత్రాలు అప్లోడ్ చేయండి (ఐచ్ఛికం)", submit:"🙏 అభ్యర్థన సమర్పించండి 🙏", success:"నమస్కారం! మీ అభ్యర్థన అందింది. 24 గంటల్లో సంప్రదిస్తాను. 🙏", services:["కుండలి విశ్లేషణ – ₹1,500","తారో రీడింగ్ – ₹800","సంఖ్యాశాస్త్ర నివేదిక – ₹600","వాస్తు సంప్రదింపు – ₹2,000","కుండలి మిలాన్ – ₹1,200","పరిహారాలు & రత్నాలు – ₹700"], modes:["నేరుగా (బెంగళూరు)","వీడియో కాల్ (Zoom)","ఫోన్ కాల్","ఇమెయిల్ నివేదిక"], times:["ఉదయం: 9 AM – 12 PM","మధ్యాహ్నం: 12 PM – 4 PM","సాయంత్రం: 4 PM – 8 PM"] },
    testimonials: { tag:"వినియోగదారుల అనుభవాలు", title:"సాధకుల మాటలు", desc:"భారతదేశం అంతటా వేలాది జీవితాలను తాకాను.", items:[{stars:5,text:"కుండలి రీడింగ్ అద్భుతంగా ఖచ్చితంగా ఉంది. పరిహారం తర్వాత మూడు నెలల్లో పదోన్నతి లభించింది.",name:"ప్రియా మల్హోత్రా",loc:"ఢిల్లీ · కుండలి విశ్లేషణ"},{stars:5,text:"కుండలి పొంతన కోసం సంప్రదించాం. వివాహం ఆనందంగా ఉంది.",name:"సురేష్ & మీనా అయ్యర్",loc:"చెన్నై · కుండలి మిలాన్"},{stars:5,text:"దుకాణం కోసం వాస్తు సంప్రదింపు అద్భుతంగా పని చేసింది. రెండు నెలల్లో వ్యాపారం రెట్టింపైంది.",name:"రాజేష్ శర్మ",loc:"బెంగళూరు · వాస్తు సంప్రదింపు"}] },
    connect: { tag:"సంప్రదించు & చెల్లించు", title:"నన్ను సంప్రదించండి", social:"📡 సోషల్ మీడియాలో చేరండి", pay:"💳 UPI ద్వారా చెల్లించండి", items:[{e:"💬",n:"WhatsApp",h:"+91 99999 99999",url:"https://wa.me/919999999999"},{e:"📸",n:"Instagram",h:"@jyotishacharya",url:"#"},{e:"▶️",n:"YouTube",h:"@JyotishAcharya",url:"#"},{e:"🌐",n:"Facebook",h:"Jyotish Acharya",url:"#"},{e:"✉️",n:"ఇమెయిల్",h:"guru@jyotishacharya.com",url:"mailto:guru@jyotishacharya.com"}], upiId:"jyotishacharya@upi", payDesc:"మొత్తం ఎంచుకొని UPI యాప్తో QR స్కాన్ చేయండి.", payNote:"చెల్లింపు తర్వాత స్క్రీన్షాట్ WhatsApp కు పంపండి. 🙏", amounts:["₹600","₹700","₹800","₹1,200","₹1,500","₹2,000"] },
    admin: { tag:"ఆచార్య డాష్బోర్డ్", title:"వినియోగదారు అపాయింట్మెంట్ అభ్యర్థనలు", desc:"అన్ని దరఖాస్తులు.", panelTitle:"🪔 బుకింగ్ అభ్యర్థనలు", all:"అన్నీ", newS:"కొత్తవి", confirmed:"నిర్ధారించబడింది", done:"పూర్తయింది", clearAll:"అన్నీ తొలగించు", empty:"ఇంకా అపాయింట్మెంట్లు లేవు.", confirmBtn:"✓ నిర్ధారించు", doneBtn:"✓ పూర్తి", delBtn:"✕", cols:["#","పేరు","జన్మ వివరాలు","సేవ","అపాయింట్మెంట్","ప్రశ్న","పత్రాలు","స్థితి","చర్యలు"] },
    login: { title:"ఆచార్య లాగిన్", sub:"నిర్వాహక యాక్సెస్ మాత్రమే", email:"ఇమెయిల్ చిరునామా", pass:"పాస్వర్డ్", btn:"సైన్ ఇన్", forgot:"పాస్వర్డ్ మర్చిపోయారా?", error:"తప్పు క్రెడెన్షియల్స్.", demo:"డెమో: admin@jyotish.com / admin123" },
    footer: { tagline:"వేద జ్యోతిష్కుడు · బెంగళూరు, భారతదేశం", copy:"© 2026 జ్యోతిష్ ఆచార్య. అన్ని హక్కులు పోరాడబడ్డాయి.", disclaimer:"జ్యోతిష్యం ఒక ఆధ్యాత్మిక మార్గదర్శి." },
    theme: { light:"☀️ వెలుతురు", dark:"🌙 చీకటి", night:"🌌 రాత్రి" },
  }
};

// ─────────────────────────────────────────────
// CONTEXTS (Angular-like Services)
// ─────────────────────────────────────────────
const AppContext = createContext(null);

// ─────────────────────────────────────────────
// THEME DEFINITIONS
// ─────────────────────────────────────────────
const themes = {
  light: {
    bg: "#FDF6E8", bgAlt: "#FAF0D7", bgCard: "#ffffff", bgParch: "#F5E6C4",
    text: "#2C1A0E", textMid: "#5C3A1E", textLight: "#8B5E3C",
    maroon: "#7B1C2E", maroonDark: "#560F1E", maroonLight: "#A33044",
    saffron: "#E8651A", saffronLight: "#F5923E", saffronPale: "#FFF3E8",
    gold: "#C8920A", goldLight: "#F0B429",
    navBg: "#FDF6E8", navBorder: "#E8651A",
    border: "rgba(123,28,46,0.12)", shadow: "rgba(123,28,46,0.1)",
    inputBg: "#FDF6E8", inputBorder: "rgba(123,28,46,0.2)",
    tableBg: "#FDF6E8", tableHead: "#FFF3E8",
    heroGrad: "linear-gradient(180deg,rgba(123,28,46,.92) 0%,rgba(86,15,30,.96) 100%)",
    footerBg: "#560F1E",
  },
  dark: {
    bg: "#1a0f1e", bgAlt: "#221428", bgCard: "#2a1830", bgParch: "#1f1228",
    text: "#f0e6d4", textMid: "#c8aa88", textLight: "#8a7060",
    maroon: "#e8651a", maroonDark: "#c8520e", maroonLight: "#f5923e",
    saffron: "#f0b429", saffronLight: "#f5c84a", saffronPale: "rgba(240,180,41,0.12)",
    gold: "#f0b429", goldLight: "#f5c84a",
    navBg: "rgba(26,15,30,0.97)", navBorder: "#e8651a",
    border: "rgba(240,180,41,0.2)", shadow: "rgba(0,0,0,0.4)",
    inputBg: "rgba(255,255,255,0.05)", inputBorder: "rgba(240,180,41,0.25)",
    tableBg: "#221428", tableHead: "rgba(240,180,41,0.08)",
    heroGrad: "linear-gradient(180deg,rgba(26,15,30,.97) 0%,rgba(15,8,25,.99) 100%)",
    footerBg: "#120a1a",
  },
  night: {
    bg: "#000d1a", bgAlt: "#001020", bgCard: "#001828", bgParch: "#00141f",
    text: "#cce8ff", textMid: "#88b4d4", textLight: "#4a7090",
    maroon: "#00a8e8", maroonDark: "#007ab5", maroonLight: "#22c0f0",
    saffron: "#00c8a0", saffronLight: "#00e4b8", saffronPale: "rgba(0,200,160,0.1)",
    gold: "#00e4b8", goldLight: "#4dffd8",
    navBg: "rgba(0,13,26,0.97)", navBorder: "#00a8e8",
    border: "rgba(0,168,232,0.2)", shadow: "rgba(0,0,0,0.6)",
    inputBg: "rgba(0,168,232,0.05)", inputBorder: "rgba(0,168,232,0.25)",
    tableBg: "#001020", tableHead: "rgba(0,168,232,0.08)",
    heroGrad: "linear-gradient(180deg,rgba(0,13,26,.98) 0%,rgba(0,5,15,1) 100%)",
    footerBg: "#000a14",
  }
};

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState("light");
  const [page, setPage] = useState("home"); // home | login | admin
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookings, setBookings] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ja_bookings") || "[]"); } catch { return []; }
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const t = translations[lang];
  const th = themes[theme];

  const saveBookings = (b) => {
    setBookings(b);
    try { localStorage.setItem("ja_bookings", JSON.stringify(b)); } catch {}
  };

  const addBooking = (b) => saveBookings([b, ...bookings]);
  const updateBooking = (id, status) => saveBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
  const deleteBooking = (id) => saveBookings(bookings.filter(b => b.id !== id));
  const clearAll = () => saveBookings([]);

  const ctx = { t, th, theme, setTheme, lang, setLang, page, setPage, isLoggedIn, setIsLoggedIn, bookings, addBooking, updateBooking, deleteBooking, clearAll, mobileOpen, setMobileOpen };

  return (
    <AppContext.Provider value={ctx}>
      <style>{globalStyles(th)}</style>
      <div className="app-root" style={{ background: th.bg, color: th.text, minHeight: "100vh" }}>
        <Navbar />
        {page === "login" && <LoginPage />}
        {page === "admin" && isLoggedIn && <AdminPage />}
        {page === "admin" && !isLoggedIn && <LoginPage />}
        {page === "home" && <HomePage />}
      </div>
    </AppContext.Provider>
  );
}

// ─────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────
function globalStyles(th) {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Rozha+One&family=Hind:wght@300;400;500;600&family=Tiro+Devanagari+Sanskrit&display=swap');
    * { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    .app-root { font-family:'Hind',sans-serif; transition:background .3s,color .3s; }
    /* NAVBAR */
    .navbar { position:sticky; top:0; z-index:200; background:${th.navBg}; border-bottom:3px solid ${th.saffron}; box-shadow:0 2px 20px ${th.shadow}; backdrop-filter:blur(12px); }
    .top-strip { background:${th.maroon}; padding:.35rem 2rem; display:flex; justify-content:space-between; align-items:center; font-size:.75rem; color:rgba(255,243,220,.8); }
    .strip-om { color:${th.goldLight}; letter-spacing:.3em; }
    .nav-inner { max-width:1300px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; padding:.7rem 2rem; gap:1rem; }
    .nav-logo { display:flex; align-items:center; gap:.8rem; text-decoration:none; cursor:pointer; }
    .nav-logo-icon { width:48px; height:48px; background:${th.maroon}; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.5rem; box-shadow:0 0 0 2px ${th.gold},0 0 0 5px ${th.maroon}; flex-shrink:0; }
    .nav-logo-name { font-family:'Rozha One',serif; font-size:1.25rem; color:${th.maroon}; display:block; }
    .nav-logo-sub { font-size:.65rem; color:${th.saffron}; letter-spacing:.12em; text-transform:uppercase; }
    .nav-links-wrap { display:flex; align-items:center; gap:.2rem; flex-wrap:wrap; }
    .nav-link { padding:.55rem 1rem; color:${th.textMid}; text-decoration:none; font-size:.83rem; font-weight:600; transition:all .2s; border-bottom:2px solid transparent; cursor:pointer; background:none; border:none; border-bottom:2px solid transparent; font-family:'Hind',sans-serif; }
    .nav-link:hover,.nav-link.active { color:${th.maroon}; border-bottom-color:${th.saffron}; }
    .nav-cta { background:${th.maroon} !important; color:white !important; border-radius:2px; border-bottom:none !important; padding:.55rem 1.2rem !important; }
    .nav-cta:hover { background:${th.maroonLight} !important; }
    .nav-controls { display:flex; align-items:center; gap:.5rem; flex-shrink:0; }
    /* THEME SWITCHER */
    .theme-btns { display:flex; gap:.25rem; }
    .theme-btn { padding:.3rem .55rem; font-size:.7rem; border:1px solid ${th.border}; background:transparent; color:${th.textMid}; cursor:pointer; border-radius:3px; transition:all .2s; font-family:'Hind',sans-serif; }
    .theme-btn.active { background:${th.saffron}; color:white; border-color:${th.saffron}; }
    /* LANG */
    .lang-btns { display:flex; gap:.2rem; }
    .lang-btn { padding:.3rem .45rem; font-size:.7rem; border:1px solid ${th.border}; background:transparent; color:${th.textMid}; cursor:pointer; border-radius:3px; font-weight:700; transition:all .2s; font-family:'Hind',sans-serif; }
    .lang-btn.active { background:${th.gold}; color:white; border-color:${th.gold}; }
    /* HAMBURGER */
    .hamburger { display:none; flex-direction:column; gap:4px; cursor:pointer; padding:.4rem; background:none; border:none; }
    .hamburger span { display:block; width:22px; height:2px; background:${th.maroon}; border-radius:2px; transition:all .3s; }
    /* HERO */
    .hero { background:${th.heroGrad}; min-height:88vh; display:flex; align-items:center; justify-content:center; text-align:center; padding:5rem 2rem 4rem; position:relative; overflow:hidden; }
    .hero-border { position:absolute; inset:20px; border:1px solid rgba(240,180,41,.5); pointer-events:none; }
    .hero-om { font-size:4rem; color:${th.goldLight}; display:block; margin-bottom:.8rem; animation:pulseGlow 3s ease-in-out infinite; }
    @keyframes pulseGlow { 0%,100%{text-shadow:0 0 40px rgba(240,180,41,.4)} 50%{text-shadow:0 0 80px rgba(240,180,41,.9)} }
    .hero-sanskrit { font-family:'Tiro Devanagari Sanskrit',serif; font-size:1rem; color:rgba(240,180,41,.7); letter-spacing:.2em; margin-bottom:1.2rem; animation:fadeUp .8s .2s both; }
    .hero-title { font-family:'Rozha One',serif; font-size:clamp(2.4rem,5.5vw,5rem); color:#FDF6E8; line-height:1.05; margin-bottom:.5rem; animation:fadeUp .8s .3s both; }
    .hero-title span { color:${th.goldLight}; }
    .hero-sub { font-size:1.1rem; color:rgba(253,246,232,.75); max-width:540px; margin:1rem auto 2.5rem; line-height:1.7; font-weight:300; animation:fadeUp .8s .5s both; }
    .hero-badges { display:flex; gap:.8rem; justify-content:center; flex-wrap:wrap; margin-bottom:2.5rem; animation:fadeUp .8s .6s both; }
    .hero-badge { background:rgba(200,146,10,.15); border:1px solid rgba(200,146,10,.4); padding:.35rem 1rem; font-size:.78rem; color:${th.goldLight}; font-weight:500; }
    .hero-ctas { display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; animation:fadeUp .8s .7s both; }
    @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
    /* BUTTONS */
    .btn { padding:.85rem 2.2rem; font-family:'Hind',sans-serif; font-size:.92rem; font-weight:600; letter-spacing:.04em; cursor:pointer; transition:all .25s; text-decoration:none; display:inline-block; border-radius:2px; border:none; }
    .btn-saffron { background:${th.saffron}; color:white; border:2px solid ${th.saffron}; box-shadow:0 4px 18px rgba(232,101,26,.3); }
    .btn-saffron:hover { background:${th.saffronLight}; transform:translateY(-2px); }
    .btn-gold-o { background:transparent; color:${th.goldLight}; border:2px solid rgba(200,146,10,.5); }
    .btn-gold-o:hover { background:rgba(200,146,10,.1); border-color:${th.goldLight}; transform:translateY(-2px); }
    .btn-maroon { background:${th.maroon}; color:white; border:2px solid ${th.maroon}; }
    .btn-maroon:hover { background:${th.maroonLight}; transform:translateY(-2px); }
    /* STATS */
    .stats-strip { background:${th.maroon}; padding:1.6rem 2rem; display:flex; justify-content:center; flex-wrap:wrap; gap:0; }
    .stat-item { text-align:center; padding:.4rem 2.5rem; border-right:1px solid rgba(255,255,255,.15); }
    .stat-item:last-child { border-right:none; }
    .stat-num { font-family:'Rozha One',serif; font-size:2rem; color:${th.goldLight}; display:block; }
    .stat-label { font-size:.72rem; color:rgba(253,246,232,.6); letter-spacing:.1em; text-transform:uppercase; }
    /* SECTIONS */
    .section-header { text-align:center; padding:4.5rem 2rem 2rem; }
    .section-tag { display:inline-block; background:${th.saffronPale}; color:${th.saffron}; border:1px solid rgba(232,101,26,.25); padding:.28rem 1.1rem; font-size:.72rem; letter-spacing:.18em; text-transform:uppercase; font-weight:600; margin-bottom:.8rem; }
    .section-title { font-family:'Rozha One',serif; font-size:clamp(1.7rem,3.5vw,2.6rem); color:${th.maroon}; line-height:1.15; }
    .sdiv { display:flex; align-items:center; gap:1rem; max-width:280px; margin:.8rem auto; }
    .sdiv-line { flex:1; height:1px; background:linear-gradient(90deg,transparent,${th.gold},transparent); }
    .section-desc { color:${th.textLight}; max-width:560px; margin:.4rem auto 0; line-height:1.8; font-size:.97rem; font-weight:300; }
    /* ABOUT */
    .about-section { background:${th.bgAlt}; position:relative; }
    .about-section::before { content:''; position:absolute; top:0; left:0; right:0; height:4px; background:linear-gradient(90deg,${th.maroon},${th.saffron},${th.gold},${th.saffron},${th.maroon}); }
    .about-inner { max-width:1100px; margin:0 auto; padding:2.5rem 2rem 5rem; display:grid; grid-template-columns:320px 1fr; gap:4rem; align-items:start; }
    .portrait-frame { width:240px; height:320px; margin:0 auto; border:3px solid ${th.maroon}; box-shadow:7px 7px 0 ${th.gold},11px 11px 0 ${th.saffron}; }
    .portrait-inner { width:100%; height:100%; background:linear-gradient(135deg,${th.bgParch},${th.bgAlt}); display:flex; align-items:center; justify-content:center; font-size:6rem; }
    .portrait-name { font-family:'Rozha One',serif; font-size:1.2rem; color:${th.maroon}; margin-top:1.2rem; text-align:center; }
    .portrait-sub { font-size:.82rem; color:${th.textLight}; text-align:center; margin-top:.2rem; }
    .about-text h2 { font-family:'Rozha One',serif; font-size:1.9rem; color:${th.maroon}; margin-bottom:.5rem; }
    .tagline-q { color:${th.saffron}; font-style:italic; font-size:1rem; margin-bottom:1.3rem; border-left:3px solid ${th.saffron}; padding-left:1rem; }
    .about-p { color:${th.textMid}; line-height:1.85; margin-bottom:.9rem; font-size:.97rem; }
    .cert-item { display:flex; align-items:flex-start; gap:.7rem; margin-bottom:.65rem; font-size:.9rem; color:${th.textMid}; }
    .cert-dot { width:7px; height:7px; border-radius:50%; background:${th.saffron}; flex-shrink:0; margin-top:6px; }
    .remedy-note { background:${th.saffronPale}; border-left:4px solid ${th.saffron}; padding:.9rem 1.1rem; font-size:.88rem; color:${th.textMid}; font-style:italic; margin-top:.9rem; line-height:1.7; }
    /* SERVICES */
    .services-section { background:${th.bg}; }
    .services-grid { max-width:1100px; margin:0 auto; padding:0 2rem 5rem; display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:1.4rem; }
    .svc-card { background:${th.bgCard}; border:1px solid ${th.border}; border-top:4px solid ${th.saffron}; padding:1.8rem 1.6rem; transition:all .3s; position:relative; overflow:hidden; }
    .svc-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:3px; background:linear-gradient(90deg,${th.maroon},${th.saffron}); transform:scaleX(0); transition:transform .3s; transform-origin:left; }
    .svc-card:hover { transform:translateY(-4px); box-shadow:0 12px 35px ${th.shadow}; border-top-color:${th.maroon}; }
    .svc-card:hover::after { transform:scaleX(1); }
    .svc-icon { font-size:2rem; margin-bottom:.85rem; display:block; }
    .svc-name { font-family:'Rozha One',serif; font-size:1.15rem; color:${th.maroon}; margin-bottom:.55rem; }
    .svc-desc { color:${th.textLight}; font-size:.9rem; line-height:1.7; margin-bottom:1.3rem; }
    .svc-footer { display:flex; justify-content:space-between; align-items:center; }
    .svc-price { font-family:'Rozha One',serif; color:${th.saffron}; font-size:1.25rem; }
    .svc-dur { font-size:.76rem; color:${th.textLight}; }
    /* BOOKING */
    .booking-section { background:${th.bgParch}; }
    .booking-wrap { max-width:800px; margin:0 auto; padding:0 2rem 5rem; }
    .booking-card { background:${th.bgCard}; border:1px solid ${th.border}; box-shadow:0 8px 35px ${th.shadow}; overflow:hidden; }
    .bc-head { background:${th.maroon}; padding:1.6rem 2.2rem; display:flex; align-items:center; gap:1rem; }
    .bc-head h3 { font-family:'Rozha One',serif; color:#FDF6E8; font-size:1.3rem; }
    .bc-head p { color:rgba(253,246,232,.65); font-size:.82rem; margin-top:.2rem; }
    .bc-body { padding:2.2rem; }
    .sub-head { font-family:'Rozha One',serif; color:${th.maroon}; font-size:.95rem; margin-bottom:.9rem; padding-bottom:.45rem; border-bottom:1px solid ${th.border}; margin-top:.2rem; }
    .form-row { display:grid; grid-template-columns:1fr 1fr; gap:1.1rem; }
    .form-group { display:flex; flex-direction:column; gap:.4rem; margin-bottom:1.1rem; }
    .form-group label { font-size:.76rem; font-weight:700; color:${th.textMid}; letter-spacing:.05em; text-transform:uppercase; }
    .form-group input,.form-group select,.form-group textarea { border:1.5px solid ${th.inputBorder}; padding:.72rem .9rem; font-family:'Hind',sans-serif; font-size:.92rem; color:${th.text}; background:${th.inputBg}; outline:none; transition:border-color .2s,box-shadow .2s; width:100%; }
    .form-group input:focus,.form-group select:focus,.form-group textarea:focus { border-color:${th.saffron}; box-shadow:0 0 0 3px rgba(232,101,26,.12); }
    .form-group textarea { min-height:88px; resize:vertical; }
    .form-group select option { background:${th.bgCard}; color:${th.text}; }
    .upload-zone { border:2px dashed ${th.border}; padding:1.4rem; text-align:center; cursor:pointer; background:${th.saffronPale}; transition:all .25s; margin-bottom:1.4rem; }
    .upload-zone:hover { border-color:${th.saffron}; }
    .up-icon { font-size:1.7rem; display:block; margin-bottom:.35rem; }
    .upload-txt { color:${th.textMid}; font-size:.85rem; }
    .upload-txt span { color:${th.saffron}; font-weight:600; }
    .form-submit { text-align:center; padding-top:.4rem; }
    .success-panel { display:flex; flex-direction:column; align-items:center; margin-top:1.4rem; background:linear-gradient(135deg,#f0fdf4,#dcfce7); border:1px solid #86efac; border-left:4px solid #22c55e; padding:1.4rem; text-align:center; gap:.5rem; }
    .sp-icon { font-size:2.2rem; }
    .sp-text { color:#166534; font-size:.97rem; line-height:1.6; }
    /* TESTIMONIALS */
    .test-section { background:${th.maroon}; padding-bottom:5rem; }
    .test-section .section-title { color:#FDF6E8; }
    .test-section .section-tag { background:rgba(200,146,10,.15); color:${th.goldLight}; border-color:rgba(200,146,10,.3); }
    .test-section .section-desc { color:rgba(253,246,232,.6); }
    .test-section .sdiv-line { background:linear-gradient(90deg,transparent,rgba(200,146,10,.5),transparent); }
    .test-grid { max-width:1100px; margin:0 auto; padding:0 2rem; display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:1.4rem; }
    .test-card { background:rgba(255,255,255,.06); border:1px solid rgba(200,146,10,.2); padding:1.8rem 1.6rem; position:relative; }
    .test-stars { color:${th.goldLight}; font-size:1rem; margin-bottom:.7rem; }
    .test-body { color:rgba(253,246,232,.75); font-size:.93rem; line-height:1.8; margin-bottom:1.1rem; font-style:italic; }
    .test-avatar { width:36px; height:36px; border-radius:50%; background:${th.saffron}; display:flex; align-items:center; justify-content:center; font-size:1rem; flex-shrink:0; }
    .test-name { color:#FDF6E8; font-weight:600; font-size:.9rem; }
    .test-loc { color:${th.goldLight}; font-size:.76rem; }
    .test-bq { position:absolute; top:1rem; right:1.5rem; font-size:3.5rem; color:rgba(200,146,10,.12); font-family:'Rozha One',serif; line-height:1; }
    /* CONNECT */
    .connect-section { background:${th.bg}; }
    .connect-grid { max-width:1100px; margin:0 auto; padding:0 2rem 5rem; display:grid; grid-template-columns:1fr 1fr; gap:2rem; }
    .connect-card { background:${th.bgCard}; border:1px solid ${th.border}; overflow:hidden; }
    .cc-head { background:linear-gradient(135deg,${th.maroon},${th.maroonDark}); padding:1.1rem 1.7rem; display:flex; align-items:center; gap:.75rem; }
    .cc-head h3 { font-family:'Rozha One',serif; color:#FDF6E8; font-size:1.05rem; }
    .cc-body { padding:1.7rem; }
    .social-list { display:flex; flex-direction:column; gap:.65rem; }
    .social-item { display:flex; align-items:center; gap:.9rem; padding:.82rem 1.1rem; text-decoration:none; border:1px solid ${th.border}; background:${th.bg}; transition:all .25s; color:${th.text}; }
    .social-item:hover { border-color:${th.saffron}; background:${th.saffronPale}; transform:translateX(4px); }
    .soc-emoji { font-size:1.3rem; width:34px; text-align:center; flex-shrink:0; }
    .soc-name { font-weight:600; font-size:.87rem; color:${th.text}; }
    .soc-handle { font-size:.75rem; color:${th.textLight}; margin-top:.1rem; }
    .soc-arrow { margin-left:auto; color:${th.saffron}; opacity:0; transition:opacity .2s; }
    .social-item:hover .soc-arrow { opacity:1; }
    .amt-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:.45rem; margin-bottom:1.4rem; }
    .amt-btn { background:${th.saffronPale}; border:1.5px solid rgba(232,101,26,.2); color:${th.saffron}; padding:.52rem; cursor:pointer; font-family:'Hind',sans-serif; font-size:.87rem; font-weight:700; transition:all .2s; }
    .amt-btn:hover,.amt-btn.active { background:${th.saffron}; color:white; border-color:${th.saffron}; }
    .qr-frame { width:190px; height:190px; margin:0 auto 1rem; border:3px solid ${th.maroon}; padding:7px; background:white; box-shadow:5px 5px 0 ${th.gold}; }
    .qr-upi { font-weight:700; color:${th.maroon}; font-size:.87rem; margin-bottom:.3rem; text-align:center; }
    .qr-amt { font-family:'Rozha One',serif; color:${th.saffron}; font-size:1.2rem; margin-bottom:.9rem; text-align:center; }
    .pay-icons { display:flex; gap:.4rem; justify-content:center; flex-wrap:wrap; }
    .pay-icon { background:${th.bg}; border:1px solid ${th.border}; padding:.25rem .75rem; font-size:.72rem; color:${th.textMid}; font-weight:600; }
    .pay-note { color:${th.textLight}; font-size:.78rem; margin-top:.9rem; font-style:italic; line-height:1.5; text-align:center; }
    /* ADMIN */
    .admin-page { background:${th.bg}; min-height:100vh; padding:2rem; }
    .admin-inner { max-width:1300px; margin:0 auto; }
    .admin-bar { background:${th.maroonDark}; padding:1.1rem 1.8rem; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:.8rem; }
    .admin-bar-title { font-family:'Rozha One',serif; color:#FDF6E8; font-size:1.05rem; }
    .admin-controls { display:flex; gap:.5rem; align-items:center; flex-wrap:wrap; }
    .count-badge { background:${th.saffron}; color:white; padding:.22rem .85rem; font-size:.75rem; font-weight:700; border-radius:20px; }
    .filter-btn { background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.2); color:rgba(253,246,232,.8); padding:.28rem .82rem; cursor:pointer; font-size:.75rem; transition:all .2s; font-family:'Hind',sans-serif; }
    .filter-btn:hover,.filter-btn.active { background:${th.gold}; color:${th.maroonDark}; border-color:${th.gold}; }
    .table-container { overflow-x:auto; background:${th.bgCard}; border:1px solid ${th.border}; }
    table { width:100%; border-collapse:collapse; min-width:900px; }
    thead { background:${th.tableHead}; }
    th { padding:.85rem .9rem; text-align:left; font-size:.7rem; font-weight:700; color:${th.maroon}; letter-spacing:.1em; text-transform:uppercase; border-bottom:2px solid ${th.border}; }
    td { padding:.9rem .9rem; font-size:.87rem; color:${th.text}; border-bottom:1px solid ${th.border}; vertical-align:top; }
    tr:hover td { background:rgba(232,101,26,.04); }
    .s-pill { display:inline-block; padding:.18rem .7rem; border-radius:20px; font-size:.7rem; font-weight:700; }
    .s-new { background:#dbeafe; color:#1e40af; }
    .s-confirmed { background:#fef3c7; color:#92400e; }
    .s-done { background:#dcfce7; color:#166534; }
    .tbl-btn { background:none; padding:.22rem .55rem; cursor:pointer; font-size:.7rem; font-weight:600; transition:all .2s; margin-right:.2rem; border:1px solid; font-family:'Hind',sans-serif; }
    .t-confirm { color:#1B5E20; border-color:#1B5E20; } .t-confirm:hover { background:#1B5E20; color:white; }
    .t-done { color:${th.saffron}; border-color:${th.saffron}; } .t-done:hover { background:${th.saffron}; color:white; }
    .t-del { color:${th.maroon}; border-color:${th.maroon}; } .t-del:hover { background:${th.maroon}; color:white; }
    /* LOGIN */
    .login-page { min-height:calc(100vh - 80px); display:flex; align-items:center; justify-content:center; padding:3rem 2rem; background:${th.bgAlt}; }
    .login-card { background:${th.bgCard}; border:1px solid ${th.border}; box-shadow:0 8px 40px ${th.shadow}; width:100%; max-width:420px; overflow:hidden; }
    .login-head { background:${th.maroon}; padding:2rem 2rem 1.5rem; text-align:center; }
    .login-om { font-size:2.5rem; color:${th.goldLight}; display:block; margin-bottom:.5rem; }
    .login-title { font-family:'Rozha One',serif; color:#FDF6E8; font-size:1.5rem; }
    .login-sub { color:rgba(253,246,232,.65); font-size:.82rem; margin-top:.3rem; }
    .login-body { padding:2rem; }
    .login-error { background:#fef2f2; border:1px solid #fca5a5; border-left:4px solid #ef4444; padding:.8rem 1rem; color:#b91c1c; font-size:.85rem; margin-bottom:1rem; }
    .login-demo { background:${th.saffronPale}; border:1px solid rgba(232,101,26,.2); padding:.7rem 1rem; color:${th.textMid}; font-size:.8rem; margin-bottom:1.5rem; font-style:italic; text-align:center; }
    .login-forgot { display:block; text-align:center; margin-top:1rem; color:${th.textLight}; font-size:.82rem; cursor:pointer; }
    /* FOOTER */
    .footer { background:${th.footerBg}; padding:3rem 2rem 1.5rem; text-align:center; }
    .footer-om { font-size:2.2rem; color:${th.goldLight}; display:block; margin-bottom:.7rem; }
    .footer-name { font-family:'Rozha One',serif; font-size:1.45rem; color:#FDF6E8; margin-bottom:.3rem; }
    .footer-tag { color:rgba(253,246,232,.5); font-size:.83rem; font-style:italic; margin-bottom:1.3rem; }
    .footer-links { display:flex; gap:1.5rem; justify-content:center; flex-wrap:wrap; margin-bottom:1.8rem; }
    .footer-links a { color:rgba(253,246,232,.45); text-decoration:none; font-size:.82rem; transition:color .2s; cursor:pointer; }
    .footer-links a:hover { color:${th.goldLight}; }
    .footer-copy { border-top:1px solid rgba(255,255,255,.08); padding-top:1.3rem; color:rgba(253,246,232,.28); font-size:.76rem; }
    /* REVEAL */
    .reveal { opacity:0; transform:translateY(25px); transition:all .65s ease; }
    .reveal.visible { opacity:1; transform:translateY(0); }
    /* MOBILE NAV */
    .mobile-nav { display:none; flex-direction:column; background:${th.navBg}; border-top:1px solid ${th.border}; padding:1rem 1.5rem; gap:.2rem; }
    .mobile-nav.open { display:flex; }
    .mob-link { padding:.65rem 0; color:${th.textMid}; font-size:.9rem; font-weight:600; border-bottom:1px solid ${th.border}; cursor:pointer; background:none; border-left:none; border-right:none; border-top:none; text-align:left; font-family:'Hind',sans-serif; display:block; width:100%; }
    /* RESPONSIVE */
    @media(max-width:900px) {
      .about-inner,.connect-grid { grid-template-columns:1fr; }
      .portrait-frame { width:200px; height:270px; }
    }
    @media(max-width:768px) {
      .nav-links-wrap,.nav-controls { display:none; }
      .hamburger { display:flex; }
      .form-row { grid-template-columns:1fr; }
      .stat-item { padding:.4rem 1.2rem; border-right:none; border-bottom:1px solid rgba(255,255,255,.1); }
    }
  `;
}

// ─────────────────────────────────────────────
// NAVBAR COMPONENT
// ─────────────────────────────────────────────
function Navbar() {
  const { t, th, theme, setTheme, lang, setLang, page, setPage, isLoggedIn, setIsLoggedIn, mobileOpen, setMobileOpen } = useContext(AppContext);
  const themeKeys = ["light","dark","night"];
  const langKeys = ["en","hi","ta","te"];

  const nav = (p) => { setPage(p); setMobileOpen(false); };

  return (
    <div className="navbar">
      <div className="top-strip">
        <span className="strip-om">ॐ &nbsp; नमः शिवाय &nbsp; ॐ</span>
        <div style={{display:"flex",gap:".5rem"}}>
          <a href="tel:+919999999999" style={{color:"rgba(255,243,220,.7)",textDecoration:"none",fontSize:".75rem"}}>📞 +91 99999 99999</a>
          <a href="mailto:guru@jyotishacharya.com" style={{color:"rgba(255,243,220,.7)",textDecoration:"none",fontSize:".75rem"}}>✉ guru@jyotishacharya.com</a>
        </div>
      </div>
      <div className="nav-inner">
        <div className="nav-logo" onClick={() => nav("home")}>
          <div className="nav-logo-icon">🪔</div>
          <div>
            <span className="nav-logo-name">Jyotish Acharya</span>
            <span className="nav-logo-sub">Vedic Astrologer & Spiritual Guide</span>
          </div>
        </div>
        <div className="nav-links-wrap">
          {["about","services","book","connect"].map(k => (
            <button key={k} className={`nav-link${page==="home"?"":""}`} onClick={() => { setPage("home"); setTimeout(() => { const el=document.getElementById(k); el&&el.scrollIntoView({behavior:"smooth"}); }, 80); }}>{t.nav[k]}</button>
          ))}
          {isLoggedIn && <button className="nav-link" onClick={() => nav("admin")}>{t.nav.admin}</button>}
          {isLoggedIn
            ? <button className="nav-link" onClick={() => { setIsLoggedIn(false); nav("home"); }}>{t.nav.logout}</button>
            : <button className="nav-link" onClick={() => nav("login")}>{t.nav.login}</button>}
          <button className="nav-link nav-cta" onClick={() => { setPage("home"); setTimeout(()=>{ const el=document.getElementById("book"); el&&el.scrollIntoView({behavior:"smooth"}); },80); }}>{t.nav.bookNow}</button>
        </div>
        <div className="nav-controls">
          <div className="theme-btns">
            {themeKeys.map(k => (
              <button key={k} className={`theme-btn${theme===k?" active":""}`} onClick={() => setTheme(k)}>{t.theme[k]}</button>
            ))}
          </div>
          <div className="lang-btns">
            {langKeys.map(k => (
              <button key={k} className={`lang-btn${lang===k?" active":""}`} onClick={() => setLang(k)}>{translations[k].lang}</button>
            ))}
          </div>
          <button className="hamburger" onClick={() => setMobileOpen(o=>!o)}>
            <span/><span/><span/>
          </button>
        </div>
      </div>
      <div className={`mobile-nav${mobileOpen?" open":""}`}>
        {["about","services","book","connect"].map(k => (
          <button key={k} className="mob-link" onClick={() => { setPage("home"); setMobileOpen(false); setTimeout(()=>{ const el=document.getElementById(k); el&&el.scrollIntoView({behavior:"smooth"}); },80); }}>{t.nav[k]}</button>
        ))}
        {isLoggedIn && <button className="mob-link" onClick={() => nav("admin")}>{t.nav.admin}</button>}
        {isLoggedIn
          ? <button className="mob-link" onClick={() => { setIsLoggedIn(false); nav("home"); }}>{t.nav.logout}</button>
          : <button className="mob-link" onClick={() => nav("login")}>{t.nav.login}</button>}
        <div style={{display:"flex",gap:".3rem",padding:".5rem 0",flexWrap:"wrap"}}>
          {["light","dark","night"].map(k=><button key={k} className={`theme-btn${theme===k?" active":""}`} onClick={()=>setTheme(k)}>{t.theme[k]}</button>)}
        </div>
        <div style={{display:"flex",gap:".2rem",padding:".3rem 0",flexWrap:"wrap"}}>
          {["en","hi","ta","te"].map(k=><button key={k} className={`lang-btn${lang===k?" active":""}`} onClick={()=>setLang(k)}>{translations[k].lang}</button>)}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────
function HomePage() {
  const { t, th, setPage } = useContext(AppContext);
  useReveal();
  return (
    <>
      <HeroSection />
      <StatsStrip />
      <AboutSection />
      <ServicesSection />
      <BookingSection />
      <TestimonialsSection />
      <ConnectSection />
      <Footer />
    </>
  );
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
function HeroSection() {
  const { t, th, setPage } = useContext(AppContext);
  const scrollTo = (id) => { const el=document.getElementById(id); el&&el.scrollIntoView({behavior:"smooth"}); };
  return (
    <section className="hero">
      <div className="hero-border"/>
      <div style={{position:"relative",zIndex:2}}>
        <span className="hero-om">{t.hero.om}</span>
        <p className="hero-sanskrit">{t.hero.sanskrit}</p>
        <h1 className="hero-title">{t.hero.title1}<br/><span>{t.hero.title2}</span></h1>
        <p className="hero-sub">{t.hero.sub}</p>
        <div className="hero-badges">
          {[t.hero.b1,t.hero.b2,t.hero.b3,t.hero.b4].map((b,i)=><span key={i} className="hero-badge">{b}</span>)}
        </div>
        <div className="hero-ctas">
          <button className="btn btn-saffron" onClick={()=>scrollTo("book")}>{t.hero.cta1}</button>
          <button className="btn btn-gold-o" onClick={()=>scrollTo("services")}>{t.hero.cta2}</button>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// STATS
// ─────────────────────────────────────────────
function StatsStrip() {
  const { t } = useContext(AppContext);
  return (
    <div className="stats-strip">
      {[[t.stats.s1,t.stats.l1],[t.stats.s2,t.stats.l2],[t.stats.s3,t.stats.l3],[t.stats.s4,t.stats.l4]].map(([n,l],i)=>(
        <div key={i} className="stat-item"><span className="stat-num">{n}</span><span className="stat-label">{l}</span></div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────
function AboutSection() {
  const { t, th } = useContext(AppContext);
  const a = t.about;
  return (
    <section id="about" className="about-section">
      <div className="section-header reveal">
        <span className="section-tag">{a.tag}</span>
        <h2 className="section-title">{a.title}</h2>
        <div className="sdiv"><div className="sdiv-line"/><span>{a.icon}</span><div className="sdiv-line"/></div>
      </div>
      <div className="about-inner reveal">
        <div style={{textAlign:"center"}}>
          <div className="portrait-frame"><div className="portrait-inner" style={{fontSize:"6rem",fontFamily:"serif",color:th.gold}}>ॐ</div></div>
          <div className="portrait-name">{a.name}</div>
          <div className="portrait-sub">{a.sub}</div>
        </div>
        <div>
          <h2 className="about-text h2" style={{fontFamily:"'Rozha One',serif",fontSize:"1.9rem",color:th.maroon,marginBottom:".5rem"}}>{a.h2}</h2>
          <p className="tagline-q">{a.tagline}</p>
          <p className="about-p">{a.p1}</p>
          <p className="about-p">{a.p2}</p>
          <div style={{margin:"1.3rem 0"}}>
            {[a.cert1,a.cert2,a.cert3,a.cert4].map((c,i)=>(
              <div key={i} className="cert-item"><div className="cert-dot"/><span>{c}</span></div>
            ))}
          </div>
          <div className="remedy-note">{a.note}</div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────
function ServicesSection() {
  const { t } = useContext(AppContext);
  const s = t.services;
  return (
    <section id="services" className="services-section">
      <div className="section-header reveal">
        <span className="section-tag">{s.tag}</span>
        <h2 className="section-title">{s.title}</h2>
        <div className="sdiv"><div className="sdiv-line"/><span>☀️</span><div className="sdiv-line"/></div>
        <p className="section-desc">{s.desc}</p>
      </div>
      <div className="services-grid reveal">
        {s.s.map((sv,i)=>(
          <div key={i} className="svc-card">
            <span className="svc-icon">{sv.icon}</span>
            <div className="svc-name">{sv.name}</div>
            <p className="svc-desc">{sv.desc}</p>
            <div className="svc-footer"><span className="svc-price">{sv.price}</span><span className="svc-dur">{sv.dur}</span></div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// BOOKING
// ─────────────────────────────────────────────
function BookingSection() {
  const { t, addBooking } = useContext(AppContext);
  const b = t.booking;
  const [form, setForm] = useState({fname:"",dob:"",tob:"",pob:"",phone:"",email:"",service:"",prefDate:"",prefTime:"",mode:"",question:""});
  const [file, setFile] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if(!form.fname||!form.dob||!form.phone||!form.email||!form.service){ alert("Please fill all required fields (*)"); return; }
    addBooking({id:Date.now(),...form,file,status:"new",at:new Date().toLocaleString()});
    setSuccess(true);
    setForm({fname:"",dob:"",tob:"",pob:"",phone:"",email:"",service:"",prefDate:"",prefTime:"",mode:"",question:""});
    setFile("");
    setTimeout(()=>setSuccess(false),5000);
  };

  const f = (k,v) => setForm(prev=>({...prev,[k]:v}));

  return (
    <section id="book" className="booking-section">
      <div className="section-header reveal">
        <span className="section-tag">{b.tag}</span>
        <h2 className="section-title">{b.title}</h2>
        <div className="sdiv"><div className="sdiv-line"/><span>📅</span><div className="sdiv-line"/></div>
        <p className="section-desc">{b.desc}</p>
      </div>
      <div className="booking-wrap reveal">
        <div className="booking-card">
          <div className="bc-head">
            <span style={{fontSize:"1.8rem"}}>🪔</span>
            <div><h3>{b.cardTitle}</h3><p>{b.cardSub}</p></div>
          </div>
          <div className="bc-body">
            <div className="sub-head">{b.sec1}</div>
            <div className="form-row">
              <div className="form-group"><label>{b.fname}</label><input value={form.fname} onChange={e=>f("fname",e.target.value)} placeholder=""/></div>
              <div className="form-group"><label>{b.dob}</label><input type="date" value={form.dob} onChange={e=>f("dob",e.target.value)}/></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>{b.tob}</label><input type="time" value={form.tob} onChange={e=>f("tob",e.target.value)}/></div>
              <div className="form-group"><label>{b.pob}</label><input value={form.pob} onChange={e=>f("pob",e.target.value)} placeholder="City, State"/></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>{b.phone}</label><input value={form.phone} onChange={e=>f("phone",e.target.value)} placeholder="+91"/></div>
              <div className="form-group"><label>{b.email}</label><input type="email" value={form.email} onChange={e=>f("email",e.target.value)} placeholder=""/></div>
            </div>
            <div className="sub-head" style={{marginTop:".2rem"}}>{b.sec2}</div>
            <div className="form-group">
              <label>{b.service}</label>
              <select value={form.service} onChange={e=>f("service",e.target.value)}>
                <option value="">—</option>
                {b.services.map((s,i)=><option key={i}>{s}</option>)}
              </select>
            </div>
            <div className="form-row">
              <div className="form-group"><label>{b.prefDate}</label><input type="date" value={form.prefDate} onChange={e=>f("prefDate",e.target.value)}/></div>
              <div className="form-group"><label>{b.prefTime}</label><select value={form.prefTime} onChange={e=>f("prefTime",e.target.value)}><option value="">—</option>{b.times.map((s,i)=><option key={i}>{s}</option>)}</select></div>
            </div>
            <div className="form-group">
              <label>{b.mode}</label>
              <select value={form.mode} onChange={e=>f("mode",e.target.value)}><option value="">—</option>{b.modes.map((s,i)=><option key={i}>{s}</option>)}</select>
            </div>
            <div className="sub-head" style={{marginTop:".2rem"}}>{b.sec3}</div>
            <div className="form-group"><label>{b.question}</label><textarea value={form.question} onChange={e=>f("question",e.target.value)} placeholder="..."/></div>
            <div className="upload-zone" onClick={()=>document.getElementById("fi").click()}>
              <span className="up-icon">📄</span>
              <p className="upload-txt">{b.upload} <span>(Optional)</span></p>
              {file && <p style={{color:"#7B1C2E",fontWeight:600,marginTop:".3rem",fontSize:".82rem"}}>📎 {file}</p>}
            </div>
            <input id="fi" type="file" style={{display:"none"}} onChange={e=>setFile(e.target.files[0]?.name||"")}/>
            <div className="form-submit">
              <button className="btn btn-maroon" onClick={handleSubmit} style={{width:"100%",fontSize:".97rem",padding:"1rem 2rem"}}>{b.submit}</button>
            </div>
            {success && (
              <div className="success-panel">
                <span className="sp-icon">🌟</span>
                <p className="sp-text">{b.success}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────
function TestimonialsSection() {
  const { t } = useContext(AppContext);
  const ts = t.testimonials;
  return (
    <section className="test-section">
      <div className="section-header reveal">
        <span className="section-tag">{ts.tag}</span>
        <h2 className="section-title">{ts.title}</h2>
        <div className="sdiv"><div className="sdiv-line"/><span style={{color:"#F0B429"}}>🌸</span><div className="sdiv-line"/></div>
        <p className="section-desc">{ts.desc}</p>
      </div>
      <div className="test-grid reveal">
        {ts.items.map((item,i)=>(
          <div key={i} className="test-card">
            <div className="test-bq">"</div>
            <div className="test-stars">{"★".repeat(item.stars)}</div>
            <p className="test-body">{item.text}</p>
            <div style={{display:"flex",alignItems:"center",gap:".75rem"}}>
              <div className="test-avatar">🙏</div>
              <div><div className="test-name">{item.name}</div><div className="test-loc">{item.loc}</div></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CONNECT & PAY
// ─────────────────────────────────────────────
function ConnectSection() {
  const { t, th } = useContext(AppContext);
  const c = t.connect;
  const [selAmt, setSelAmt] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = 174, upi = `upi://pay?pa=${c.upiId}${selAmt?"&am="+selAmt.replace("₹","").replace(",",""):""}`;
    let s = 0; for (let ch of upi) s = Math.imul(31,s)+ch.charCodeAt(0)|0;
    function rnd(){s^=s<<13;s^=s>>17;s^=s<<5;return(s>>>0)/0xFFFFFFFF;}
    const G=29,cs=W/G;
    ctx.fillStyle="#fff"; ctx.fillRect(0,0,W,W);
    ctx.fillStyle="#1a0a0a";
    for(let r=0;r<G;r++) for(let c2=0;c2<G;c2++) if(rnd()>.52) ctx.fillRect(c2*cs,r*cs,cs-.7,cs-.7);
    function finder(ox,oy){ctx.fillStyle="#fff";ctx.fillRect(ox,oy,cs*7,cs*7);ctx.fillStyle="#1a0a0a";ctx.fillRect(ox,oy,cs*7,cs*7);ctx.fillStyle="#fff";ctx.fillRect(ox+cs,oy+cs,cs*5,cs*5);ctx.fillStyle="#1a0a0a";ctx.fillRect(ox+cs*2,oy+cs*2,cs*3,cs*3);}
    finder(0,0); finder(W-cs*7,0); finder(0,W-cs*7);
    ctx.fillStyle="#fff"; ctx.beginPath(); ctx.arc(W/2,W/2,cs*2.2,0,Math.PI*2); ctx.fill();
    ctx.font=`${Math.floor(cs*2.6)}px serif`; ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText("🪔",W/2,W/2);
  }, [selAmt, c.upiId]);

  return (
    <section id="connect" className="connect-section">
      <div className="section-header reveal">
        <span className="section-tag">{c.tag}</span>
        <h2 className="section-title">{c.title}</h2>
        <div className="sdiv"><div className="sdiv-line"/><span>🤝</span><div className="sdiv-line"/></div>
      </div>
      <div className="connect-grid reveal">
        <div className="connect-card">
          <div className="cc-head"><span style={{fontSize:"1.4rem"}}>📡</span><h3>{c.social}</h3></div>
          <div className="cc-body">
            <div className="social-list">
              {c.items.map((item,i)=>(
                <a key={i} href={item.url} target="_blank" rel="noreferrer" className="social-item">
                  <span className="soc-emoji">{item.e}</span>
                  <div><div className="soc-name">{item.n}</div><div className="soc-handle">{item.h}</div></div>
                  <span className="soc-arrow">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="connect-card">
          <div className="cc-head"><span style={{fontSize:"1.4rem"}}>💳</span><h3>{c.pay}</h3></div>
          <div className="cc-body">
            <p style={{color:"var(--text-mid)",fontSize:".85rem",marginBottom:"1rem",lineHeight:1.6,color:th.textMid}}>{c.payDesc}</p>
            <div className="amt-grid">
              {c.amounts.map((a,i)=>(
                <button key={i} className={`amt-btn${selAmt===a?" active":""}`} onClick={()=>setSelAmt(a===selAmt?null:a)}>{a}</button>
              ))}
            </div>
            <div className="qr-frame"><canvas ref={canvasRef} width={174} height={174}/></div>
            <div className="qr-upi">UPI ID: {c.upiId}</div>
            <div className="qr-amt">{selAmt||"Scan to Pay"}</div>
            <div className="pay-icons">
              {["Google Pay","PhonePe","Paytm","BHIM","Any UPI"].map((p,i)=><span key={i} className="pay-icon">{p}</span>)}
            </div>
            <p className="pay-note">{c.payNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
function Footer() {
  const { t, setPage } = useContext(AppContext);
  const scrollTo=(id)=>{ setPage("home"); setTimeout(()=>{ const el=document.getElementById(id); el&&el.scrollIntoView({behavior:"smooth"}); },80); };
  return (
    <footer className="footer">
      <span className="footer-om">ॐ</span>
      <div className="footer-name">Jyotish Acharya</div>
      <div className="footer-tag">{t.footer.tagline}</div>
      <div className="footer-links">
        {["about","services","book","connect"].map(k=>(
          <a key={k} onClick={()=>scrollTo(k)}>{t.nav[k]}</a>
        ))}
      </div>
      <div className="footer-copy">
        {t.footer.copy}<br/>
        <span style={{fontSize:".7rem",opacity:.6}}>{t.footer.disclaimer}</span>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// LOGIN PAGE
// ─────────────────────────────────────────────
function LoginPage() {
  const { t, setIsLoggedIn, setPage } = useContext(AppContext);
  const l = t.login;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (email === "admin@jyotish.com" && pass === "admin123") {
      setIsLoggedIn(true); setPage("admin"); setError(false);
    } else { setError(true); }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-head">
          <span className="login-om">ॐ</span>
          <div className="login-title">{l.title}</div>
          <div className="login-sub">{l.sub}</div>
        </div>
        <div className="login-body">
          <div className="login-demo">{l.demo}</div>
          {error && <div className="login-error">{l.error}</div>}
          <div className="form-group">
            <label style={{fontSize:".78rem",fontWeight:700,letterSpacing:".05em",textTransform:"uppercase"}}>{l.email}</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@jyotish.com"/>
          </div>
          <div className="form-group">
            <label style={{fontSize:".78rem",fontWeight:700,letterSpacing:".05em",textTransform:"uppercase"}}>{l.pass}</label>
            <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&handleLogin()}/>
          </div>
          <button className="btn btn-maroon" onClick={handleLogin} style={{width:"100%",fontSize:"1rem",padding:"1rem"}}>{l.btn}</button>
          <span className="login-forgot">{l.forgot}</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ADMIN PAGE
// ─────────────────────────────────────────────
function AdminPage() {
  const { t, bookings, updateBooking, deleteBooking, clearAll } = useContext(AppContext);
  const a = t.admin;
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? bookings : bookings.filter(b => b.status === filter);

  const statuses = ["all","new","confirmed","done"];
  const filterLabels = { all: a.all, new: a.newS, confirmed: a.confirmed, done: a.done };

  return (
    <div className="admin-page">
      <div className="section-header" style={{paddingTop:"3rem"}}>
        <span className="section-tag">{a.tag}</span>
        <h2 className="section-title">{a.title}</h2>
        <p className="section-desc">{a.desc}</p>
      </div>
      <div className="admin-inner">
        <div className="admin-bar">
          <span className="admin-bar-title">{a.panelTitle}</span>
          <div className="admin-controls">
            <span className="count-badge">{bookings.length} Total</span>
            {statuses.map(s=>(
              <button key={s} className={`filter-btn${filter===s?" active":""}`} onClick={()=>setFilter(s)}>{filterLabels[s]}</button>
            ))}
            <button className="filter-btn" onClick={clearAll} style={{color:"#fca5a5",borderColor:"rgba(252,165,165,.4)"}}>{a.clearAll}</button>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>{a.cols.map((c,i)=><th key={i}>{c}</th>)}</tr>
            </thead>
            <tbody>
              {!filtered.length
                ? <tr><td colSpan={9} style={{textAlign:"center",padding:"3rem",fontStyle:"italic",opacity:.6}}>{a.empty}</td></tr>
                : filtered.map((b,i)=>(
                  <tr key={b.id}>
                    <td style={{opacity:.6,fontSize:".8rem"}}>{i+1}<br/><span style={{fontSize:".7rem"}}>{b.at}</span></td>
                    <td><strong>{b.fname}</strong><br/><span style={{fontSize:".78rem",opacity:.7}}>{b.phone}</span><br/><span style={{fontSize:".75rem",opacity:.6}}>{b.email}</span></td>
                    <td style={{fontSize:".82rem"}}>📅 {b.dob}{b.tob&&<><br/>⏰ {b.tob}</>}{b.pob&&<><br/>📍 {b.pob}</>}</td>
                    <td style={{fontSize:".82rem",fontWeight:600}}>{b.service}</td>
                    <td style={{fontSize:".8rem"}}>{b.prefDate||"—"}<br/><span style={{opacity:.7}}>{b.prefTime}</span><br/><span style={{opacity:.7}}>{b.mode}</span></td>
                    <td style={{fontSize:".8rem",maxWidth:"130px",opacity:.8}}>{b.question?b.question.substring(0,60)+(b.question.length>60?"…":""):"—"}</td>
                    <td style={{fontSize:".78rem",opacity:.7}}>{b.file||"—"}</td>
                    <td><span className={`s-pill s-${b.status}`}>{b.status.toUpperCase()}</span></td>
                    <td>
                      <button className="tbl-btn t-confirm" onClick={()=>updateBooking(b.id,"confirmed")}>{a.confirmBtn}</button>
                      <button className="tbl-btn t-done" onClick={()=>updateBooking(b.id,"done")}>{a.doneBtn}</button>
                      <button className="tbl-btn t-del" onClick={()=>deleteBooking(b.id)}>{a.delBtn}</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// REVEAL HOOK (Angular-like lifecycle)
// ─────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.07 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}
