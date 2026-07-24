export type Lang = "EN" | "TR";

export interface Field {
  label: string;
  placeholder: string;
}

export interface Dictionary {
  nav: {
    admission: string;
    cta: string;
  };
  hero: {
    badge: string;
    tagline: string;
    subLead: { pre: string; highlight: string; post: string };
    subEmphasis: string;
    cta: string;
    scroll: string;
  };
  manifesto: {
    label: string;
    p1: string;
    p2pre: string;
    p2highlight: string;
    p2post: string;
  };
  culture: {
    label: string;
    word: string;
    phonetic: string;
    pos: string;
    p1: string;
    p2pre: string;
    p2highlight: string;
    p2post: string;
  };
  pillars: {
    label: string;
    heading: string;
    cards: { index: string; title: string; description: string }[];
  };
  traditions: {
    label: string;
    heading: string;
    items: { index: string; title: string; description: string }[];
  };
  vetting: {
    label: string;
    heading: string;
    subtitle: string;
    steps: { number: string; title: string; description: string }[];
  };
  application: {
    label: string;
    heading: string;
    subheading: string;
    fullName: Field;
    university: Field;
    email: Field;
    url: Field;
    project: Field;
    value: Field;
    pledge: string;
    submit: string;
    sending: string;
    error: string;
    confidence: string;
    cardNote: string;
    cardStatus: string;
    cardNamePlaceholder: string;
    successTitle: string;
    successBody: string;
  };
  faq: {
    label: string;
    heading: string;
    items: { q: string; a: string }[];
  };
  footer: {
    brand: string;
    tagline: string;
  };
}

export const content: Record<Lang, Dictionary> = {
  EN: {
    nav: {
      admission: "Admission",
      cta: "MEMBERSHIP APPLICATION",
    },
    hero: {
      badge: "By Invitation Only",
      tagline: "The Young Entrepreneurs Executive Network.",
      subLead: {
        pre: "A private ecosystem uniting ambitious ",
        highlight: "young entrepreneurs",
        post: ", visionary engineers, and builders in Trabzon.",
      },
      subEmphasis: "Step up to the table where ideas turn into execution.",
      cta: "Request Invitation",
      scroll: "Scroll",
    },
    manifesto: {
      label: "The Manifesto",
      p1: "Conventional student clubs offer noise, not execution. Entrepreneurship doesn’t happen in crowded lecture halls — it starts at private tables where ambitious student builders align.",
      p2pre: "VALLIÈRE is ",
      p2highlight: "the initial table",
      p2post:
        " uniting ambitious university entrepreneurs and student engineers under one culture.",
    },
    culture: {
      label: "The Culture",
      word: "Vallière",
      phonetic: "[val-yɛʁ]",
      pos: "noun / culture",
      p1: "VALLIÈRE draws inspiration from the heritage of precision, craftsmanship, and posture. We do not view entrepreneurship merely as writing code or building slides — we treat it as a discipline of high standards.",
      p2pre: "We do not promise abstract capital or shortcuts. What we offer is ",
      p2highlight: "the initial table",
      p2post:
        ": bringing the most ambitious young entrepreneurs, engineers, and visionary students in Trabzon under one singular culture.",
    },
    traditions: {
      label: "Our Values",
      heading: "Table Traditions",
      items: [
        {
          index: "I",
          title: "Care & Stature",
          description:
            "Respect for the table and each other’s time begins with presence. Our gatherings adhere to our established dress-code and standard of refinement.",
        },
        {
          index: "II",
          title: "Open & Constructive Dialogue",
          description:
            "We cultivate an environment where ideas are shared freely and refined through constructive dialogue. Mutual trust, not artificial secrecy, is our baseline.",
        },
        {
          index: "III",
          title: "Shared Vision & Synergy",
          description:
            "We bring together ambitious, entrepreneurial-minded students who wish to expand their horizons with peers who share the same drive and vision.",
        },
      ],
    },
    pillars: {
      label: "The Pillars",
      heading: "Three foundations of the table.",
      cards: [
        {
          index: "I",
          title: "Periodic Signature Dinners",
          description:
            "Curated, dress-code private dinners and lounge sessions held at regular intervals to foster deep strategic alignment among university entrepreneurs and young builders.",
        },
        {
          index: "II",
          title: "Concrete Execution",
          description:
            "Through collaboration with student engineers in the İMEJE team, promising ideas at the table are supported to transition into tangible functional projects.",
        },
        {
          index: "III",
          title: "Ecosystem Pathways",
          description:
            "As we build this network step by step, we forge pathways connecting student entrepreneurs to national venture networks, mentorship channels, and ecosystem partners.",
        },
      ],
    },
    vetting: {
      label: "Admission & Vetting",
      heading: "The Vetting Process",
      subtitle:
        "To preserve the integrity and caliber of the table, membership is strictly selective.",
      steps: [
        {
          number: "01",
          title: "Application",
          description:
            "A short intro form where you share what you build, your projects, and your vision.",
        },
        {
          number: "02",
          title: "Conversation",
          description:
            "A relaxed get-to-know chat about your ideas, the technologies you love, and how you click with our community culture.",
        },
        {
          number: "03",
          title: "Welcome",
          description:
            "Joining the Vallière Society family — full access to the community, working groups, and shared projects.",
        },
      ],
    },
    application: {
      label: "Section V",
      heading: "Join The Initial Cohort",
      subheading:
        "For minds that build, not just talk. Every application is reviewed in confidence.",
      fullName: { label: "FULL NAME", placeholder: "Your full name" },
      university: {
        label: "UNIVERSITY & DEPARTMENT",
        placeholder: "e.g. Trabzon University — AI Engineering",
      },
      email: {
        label: "EMAIL / CONTACT",
        placeholder: "Your direct address",
      },
      url: {
        label: "PORTFOLIO & LINKS",
        placeholder: "GitHub, LinkedIn or project link",
      },
      project: {
        label: "EXECUTION & ARCHITECTURE",
        placeholder: "The most concrete value you have built, coded, or led",
      },
      value: {
        label: "PERSPECTIVE",
        placeholder: "The distinct perspective or skill you bring to the table",
      },
      pledge:
        "I pledge to honor the culture, stature, and prestige of the Vallière Society table.",
      submit: "REQUEST INVITATION",
      sending: "SENDING…",
      error: "Something went wrong. Please try again.",
      confidence: "Reviewed in strict confidence",
      cardNote:
        "Candidates who clear the vetting process receive their personalized digital ‘Vallière Member Card’ and official confirmation directly via email.",
      cardStatus: "Prospective Member",
      cardNamePlaceholder: "Your Full Name",
      successTitle: "Application Received",
      successBody:
        "Thank you. Candidates advancing to the vetting stage are contacted privately. The table values discretion.",
    },
    faq: {
      label: "Questions",
      heading: "Before the Table",
      items: [
        {
          q: "Who can apply?",
          a: "All university students into entrepreneurship, software, design and innovation — who want to build together, ship projects, and take a seat at the table with ambitious peers.",
        },
        {
          q: "Can I apply if I don’t have a concrete project yet?",
          a: "Absolutely. What we look for is the desire to learn, curiosity, and a passion for building — far more than finished projects.",
        },
        {
          q: "Is there a membership fee?",
          a: "No. Vallière Society is completely free — a collective built for students’ growth and solidarity.",
        },
        {
          q: "What is expected of members?",
          a: "Showing up to our gatherings, respecting the community and each other’s time, and giving genuine, constructive support to your peers’ work.",
        },
        {
          q: "How does the process work?",
          a: "A short intro form, a relaxed get-to-know chat, then a warm welcome into the community and its projects.",
        },
        {
          q: "Where do we meet?",
          a: "In Trabzon and online. Alongside regular online brainstorms and project sessions, we host in-person coffee meetups, workshops and work days at fine venues around the city.",
        },
      ],
    },
    footer: {
      brand: "VALLIÈRE SOCIETY • 2026",
      tagline: "Young Student Entrepreneurs Network",
    },
  },

  TR: {
    nav: {
      admission: "Başvuru",
      cta: "ÜYELİK BAŞVURUSU",
    },
    hero: {
      badge: "Yalnızca Davetle",
      tagline: "Genç Girişimciler Liderlik Ağı.",
      subLead: {
        pre: "Trabzon’daki hırslı ",
        highlight: "genç girişimcileri",
        post: ", vizyoner mühendisleri ve üreten zihinleri aynı çatı altında toplayan özel ekosistem.",
      },
      subEmphasis: "Fikirlerin eyleme dönüştüğü masada yerinizi alın.",
      cta: "Davet Talep Edin",
      scroll: "Kaydırın",
    },
    manifesto: {
      label: "Manifesto",
      p1: "Geleneksel öğrenci kulüpleri vizyon değil, sadece kalabalık ve gürültü sunar. Girişimcilik kalabalık amfilerde değil; aynı hırs ve tutkudaki öğrencilerin oturduğu özel masalarda başlar.",
      p2pre: "VALLIÈRE bir kulüp değildir; hırslı üniversiteli girişimcileri, üretken mühendis öğrencileri ve vizyoner genç zihinleri aynı masada buluşturan ",
      p2highlight: "bağımsız bir masadır",
      p2post: ".",
    },
    culture: {
      label: "Kültürümüz",
      word: "Vallière",
      phonetic: "[val-yɛʁ]",
      pos: "isim / kültür",
      p1: "Vallière, Fransız saray kültüründeki ‘özen, zanaat ve duruş’ anlayışından ilham alır. Biz girişimciliği sadece kod yazmak veya sunum yapmaktan ibaret görmüyoruz; onu bir duruş ve zanaat olarak kabul ediyoruz.",
      p2pre: "Size içi boş vaatler veya hazır yatırımlar vadetmiyoruz. Size sunduğumuz şey; Trabzon’daki en hırslı genç girişimcileri, üretken mühendisleri ve vizyoner öğrencileri aynı masada buluşturan ",
      p2highlight: "o ilk ve en nitelikli kültürdür",
      p2post: ".",
    },
    traditions: {
      label: "Değerlerimiz",
      heading: "Masa Gelenekleri",
      items: [
        {
          index: "I",
          title: "Özen ve Duruş",
          description:
            "Masaya ve birbirimizin zamanına gösterdiğimiz saygı, duruşumuzla başlar. Etkinliklerimiz belirlenen dress-code ve zarafet anlayışına tabidir.",
        },
        {
          index: "II",
          title: "Açık ve Yapıcı Diyalog",
          description:
            "Fikirlerin serbestçe paylaşıldığı, samimiyet ve yapıcı eleştiriyle keskinleştiği bir gelişim ortamı sunuyoruz. Göze sokulan gizlilik değil, karşılıklı güven esastır.",
        },
        {
          index: "III",
          title: "Ortak Vizyon ve Paylaşım",
          description:
            "Üniversite yıllarında sınırlarını zorlamak isteyen girişimci ruhlu öğrencileri, aynı tutkuyu ve hırsı paylaşan nitelikli akranlarıyla aynı masada buluşturuyoruz.",
        },
      ],
    },
    pillars: {
      label: "Temeller",
      heading: "Masanın üç temeli.",
      cards: [
        {
          index: "I",
          title: "Düzenli Özel Akşam Yemekleri",
          description:
            "Üniversiteli girişimciler ve genç üreticilerle derin stratejik bağlar geliştirmek üzere belirli aralıklarla düzenlenen, dress-code kuralına tabi özel akşam yemekleri ve sohbetler.",
        },
        {
          index: "II",
          title: "Somut Projelendirme",
          description:
            "Mühendis öğrencilerden oluşan İMEJE ekibiyle kurulan iş birliği sayesinde, masada öne çıkan fikirlerin somut projelere ve ürün süreçlerine dönüştürülmesi hedeflenir.",
        },
        {
          index: "III",
          title: "Girişim Ekosistemleri Köprüsü",
          description:
            "Adım adım inşa ettiğimiz bu yapıyla, öğrenci girişimcileri ulusal girişim ağlarına, mentörlük kanallarına ve ekosistem paydaşlarına ulaştıran köprüler inşa ediyoruz.",
        },
      ],
    },
    vetting: {
      label: "Kabul & Değerlendirme",
      heading: "Değerlendirme Süreci",
      subtitle:
        "Masanın bütünlüğünü ve niteliğini korumak adına, üyelik titizlikle seçilir.",
      steps: [
        {
          number: "01",
          title: "Başvuru",
          description:
            "Ürettiklerini, projelerini ve vizyonunu bizlerle paylaşabileceğin kısa bir tanıtım formu.",
        },
        {
          number: "02",
          title: "Değerlendirme",
          description:
            "Fikirlerin, ilgilendiğin teknolojiler ve topluluk kültürümüzle uyumunu konuştuğumuz samimi bir tanışma sohbeti.",
        },
        {
          number: "03",
          title: "Kabul",
          description:
            "Vallière Society ailesine katılım; komüniteye, çalışma gruplarına ve ortak projelere tam erişim.",
        },
      ],
    },
    application: {
      label: "Bölüm V",
      heading: "Çekirdek Kadroya Katılın",
      subheading:
        "Sadece konuşan değil, üreten zihinler içindir. Her başvuru gizlilikle değerlendirilir.",
      fullName: { label: "AD SOYAD", placeholder: "Tam adınız" },
      university: {
        label: "ÜNİVERSİTE & BÖLÜM",
        placeholder: "Örn: Trabzon Üniversitesi - Yapay Zeka Mühendisliği",
      },
      email: {
        label: "E-POSTA / İLETİŞİM",
        placeholder: "Doğrudan erişim adresiniz",
      },
      url: {
        label: "PORTFOLYO & BAĞLANTILAR",
        placeholder: "GitHub, LinkedIn veya Proje bağlantısı",
      },
      project: {
        label: "İCRAAT & MİMARİ",
        placeholder:
          "İnşa ettiğiniz, kodladığınız veya yönettiğiniz en somut değer",
      },
      value: {
        label: "PERSPEKTİF",
        placeholder: "Masaya katacağınız özgün bakış açısı veya yetkinlik",
      },
      pledge:
        "Vallière Society kültürüne, zarafetine ve masanın saygınlığına bağlı kalacağımı taahhüt ederim.",
      submit: "DAVETİYE TALEP EDİN",
      sending: "GÖNDERİLİYOR…",
      error: "Bir sorun oluştu. Lütfen tekrar deneyin.",
      confidence: "Gizlilikle değerlendirilir",
      cardNote:
        "Mülakat sürecini başarıyla tamamlayan adaylara kişiye özel dijital ‘Vallière Üye Kartı’ ve onay belgesi e-posta aracılığıyla iletilmektedir.",
      cardStatus: "Aday Üye",
      cardNamePlaceholder: "Adınız Soyadınız",
      successTitle: "Başvurunuz Alındı",
      successBody:
        "Teşekkürler. Değerlendirme aşamasına geçen adaylarla özel olarak iletişime geçilir. Masa, gizliliğe değer verir.",
    },
    faq: {
      label: "Sorular",
      heading: "Masadan Önce",
      items: [
        {
          q: "Kimler başvurabilir?",
          a: "Girişimcilik, yazılım, tasarım ve inovasyona ilgi duyan; birlikte üretmek, projeler geliştirmek ve hırslı akranlarıyla aynı masada yer almak isteyen tüm üniversite öğrencileri.",
        },
        {
          q: "Henüz somut bir projem yoksa yine de başvurabilir miyim?",
          a: "Kesinlikle! Aradığımız temel kriter bitmiş projelerden ziyade öğrenme arzusu, merak ve üretme tutkusudur.",
        },
        {
          q: "Üyelik ücretli mi?",
          a: "Hayır, Vallière Society tamamen öğrencilerin gelişimini ve dayanışmasını hedefleyen ücretsiz bir kolektiftir.",
        },
        {
          q: "Üyelerden ne beklenir?",
          a: "Buluşmalara katılım, topluluğa ve birbirimizin emeğine saygı, ve akranlarının projelerine samimi, yapıcı katkı sunmak.",
        },
        {
          q: "Süreç nasıl işliyor?",
          a: "Kısa bir tanıtım formu, samimi bir tanışma sohbeti ve ardından topluluğa ve projelere sıcak bir “hoş geldin”.",
        },
        {
          q: "Nerede buluşuyoruz?",
          a: "Trabzon’da ve online. Düzenli online beyin fırtınaları ve proje oturumlarının yanı sıra, şehrimizdeki nitelikli mekanlarda yüz yüze kahve buluşmaları, atölyeler ve çalışma günleri düzenliyoruz.",
        },
      ],
    },
    footer: {
      brand: "VALLIÈRE SOCIETY • 2026",
      tagline: "Genç Öğrenci Girişimciler Ağı",
    },
  },
};
