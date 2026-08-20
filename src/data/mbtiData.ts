import { ArchetypeDetail } from '../types';

export const mbtiDetails: Record<string, ArchetypeDetail> = {
  ISTJ: {
    title: "Logistik / Inspektur (Inspector)",
    desc: "Individu yang praktis, mengutamakan fakta, sangat andal, dan berdedikasi tinggi pada aturan serta tradisi operasional.",
    strengths: ["Jujur & Terbuka", "Bertanggung Jawab Tinggi", "Sangat Detail & Teliti", "Tenang & Praktis Dalam Krisis"],
    weaknesses: ["Cenderung Keras Kepala", "Kurang Sensitif Terhadap Emosi", "Terlalu Kaku Terhadap Prosedur", "Mudah Menyalahkan Diri"],
    careers: ["Akuntan / Auditor", "Analis Keuangan", "Manajer Operasional", "Spesialis Compliance", "Pengawas Mutu (QC)"],
    leadershipStyle: "Kepemimpinan terstruktur berbasis SOP, mengutamakan akuntabilitas dan pencapaian target kerja.",
    workplaceFit: "Lingkungan kerja yang teratur, stabil, dengan ekspektasi dan KPI yang terdefinisi dengan jelas."
  },
  ISFJ: {
    title: "Pembela / Pelindung (Protector)",
    desc: "Pribadi yang sangat hangat, penuh kasih, protektif, dan selalu siap membela serta mendukung stabilitas tim.",
    strengths: ["Sangat Suportif & Empatis", "Dapat Sangat Diandalkan", "Peka Terhadap Kebutuhan Tim", "Pekerja Keras & Setia"],
    weaknesses: ["Terlalu Rendah Hati", "Menyimpan Perasaan Sendiri", "Sulit Menolak Tugas Tambahan", "Rentan Terhadap Stres Kerja"],
    careers: ["Pekerja Sosial & Medis", "HRD & Employee Relations", "Customer Success Specialist", "Administrator Tim", "Tenaga Pendidik"],
    leadershipStyle: "Kepemimpinan mengayomi yang berfokus pada kesejahteraan anggota tim dan keharmonisan lingkungan.",
    workplaceFit: "Budaya perusahaan yang suportif, kekeluargaan, dan menghargai kontribusi individu."
  },
  INFJ: {
    title: "Advokat / Konselor (Advocate)",
    desc: "Tipe kepribadian visioner yang idealis dan berstruktur, memiliki integritas serta wawasan mendalam tentang potensi manusia.",
    strengths: ["Kreatif & Visioner", "Sangat Berprinsip", "Penuh Empati & Wawasan", "Bersemangat Pada Misi"],
    weaknesses: ["Sensitif Terhadap Kritik", "Sangat Tertutup", "Perfeksionis Ekstrem", "Mudah Burnout"],
    careers: ["Psikolog / Konselor Organisasi", "Penulis & Strategis Konten", "HRD Talent Development", "Konsultan Manajemen Change"],
    leadershipStyle: "Kepemimpinan transformasional yang menginspirasi tim melalui nilai-nilai dan visi jangka panjang.",
    workplaceFit: "Organisasi dengan tujuan sosial jelas, lingkungan inovatif, dan menghargai integritas moral."
  },
  INTJ: {
    title: "Arsitek / Ahli Strategi (Mastermind)",
    desc: "Pemikir taktis yang imajinatif sekaligus bertekad kuat, mandiri, dan sangat berfokus pada efisiensi serta sistem jangka panjang.",
    strengths: ["Berpikiran Logis & Analitis", "Sangat Mandiri", "Inovatif dalam Pemecahan Masalah", "Pengetahuan Luas & Taktis"],
    weaknesses: ["Sering Terlihat Kaku / Arogan", "Terlalu Kritis Terhadap Tim", "Kurang Peka Masalah Emosional", "Cenderung Overthinking"],
    careers: ["Software Engineer / System Architect", "Ahli Strategi Bisnis", "Analis Data / Data Scientist", "Manajer Riset & Pengembangan"],
    leadershipStyle: "Kepemimpinan strategis yang menetapkan standar tinggi dan mendorong inovasi berkelanjutan.",
    workplaceFit: "Lingkungan profesional mandiri berbasis kinerja objektif dan kebebasan berpikir analitis."
  },
  ISTP: {
    title: "Pengrajin / Virtuoso (Craftsman)",
    desc: "Eksperimenter yang berani dan praktis, ahli dalam menguasai alat, mekanika, serta pemecahan masalah teknis instan.",
    strengths: ["Optimis & Energetik", "Sangat Praktis & Efisien", "Spontan & Kreatif", "Tenang dan Hebat Saat Krisis"],
    weaknesses: ["Mudah Bosan Dengan Rutinitas", "Tertutup / Menyendiri", "Suka Mengambil Risiko Berlebih", "Enggan Berkomitmen Kaku"],
    careers: ["Teknisi & Mekanik Ahli", "Analisis Keamanan / Forensik", "Spesialis Jaringan IT", "Pilot / Operator Lapangan"],
    leadershipStyle: "Kepemimpinan 'lead-by-example' dengan bertindak langsung di lapangan untuk menyelesaikan masalah.",
    workplaceFit: "Dunia kerja dinamis, minim birokrasi kaku, dengan tantangan pemecahan masalah taktis harian."
  },
  ISFP: {
    title: "Petualang / Seniman (Composer)",
    desc: "Pribadi yang fleksibel, menawan, selalu siap mengeksplorasi ide visual baru dan mengekspresikan nilai diri melalui karya nyata.",
    strengths: ["Sangat Menawan & Ramah", "Peka Terhadap Estetika & Detail", "Imajinatif & Fleksibel", "Sangat Menghargai Harmoni"],
    weaknesses: ["Sangat Mandiri hingga Sulit Diatur", "Sulit Diprediksi", "Rentan Terhadap Tekanan Kerja", "Kurang Suka Kompetisi Keras"],
    careers: ["Desainer Grafis / UIUX", "Fotografer & Videografer", "Koki / Spesialis Kuliner", "Spesialis Brand & Estetika"],
    leadershipStyle: "Kepemimpinan partisipatif yang memberi kebebasan berkreasi dan ruang berekspresi bagi tim.",
    workplaceFit: "Lingkungan kreatif yang santai, suportif, dan menghargai orisinalitas tanpa tekanan berlebihan."
  },
  INFP: {
    title: "Mediator / Idealis (Healer)",
    desc: "Pribadi yang puitis, baik hati, altruistik, dan bersemangat tinggi membantu mewujudkan tujuan kemanusiaan serta harmoni.",
    strengths: ["Sangat Peduli & Empatis", "Kreatif & Berpikiran Terbuka", "Berkomitmen Pada Nilai Diri", "Penyelaras Tim"],
    weaknesses: ["Terlalu Idealis", "Sering Mengabaikan Data Konkret", "Sangat Sensitif Terhadap Konflik", "Sulit Mengambil Keputusan Keras"],
    careers: ["Penulis & Novelis", "Penerjemah Bahasa", "Konselor Kesehatan Mental", "Spesialis Corporate Social Responsibility (CSR)"],
    leadershipStyle: "Kepemimpinan empatik yang berfokus pada pengembangan potensi unik setiap anggota tim.",
    workplaceFit: "Lingkungan kerja fleksibel yang sejalan dengan prinsip moral dan nilai-nilai kemanusiaan."
  },
  INTP: {
    title: "Logis / Pemikir (Architect)",
    desc: "Penemu kreatif dengan rasa ingin tahu tinggi, sangat tertarik pada teori, sains, arsitektur data, dan struktur analitis.",
    strengths: ["Sangat Analitis & Tajam", "Orisinal & Inovatif", "Berpikiran Sangat Terbuka", "Jujur & Objektif"],
    weaknesses: ["Sering Ragu-ragu (Analysis Paralysis)", "Kurang Peka Terhadap Perasaan", "Pelupa / Cenderung Disorganisasi", "Meragukan Kemampuan Diri"],
    careers: ["Programmer / Software Engineer", "Fisikawan / Peneliti Utama", "Analis Keamanan Siber", "Konsultan Sistem IT"],
    leadershipStyle: "Kepemimpinan konseptual yang menantang asumsi lama dan mendorong pemikiran kritis mendalam.",
    workplaceFit: "Laboratorium R&D atau pusat inovasi dengan fleksibilitas intelektual dan proyek kompleks."
  },
  ESTP: {
    title: "Pengusaha / Dinamis (Dynamo)",
    desc: "Orang yang cerdas, bertenaga, sangat ramah, dan menikmati aksi nyata serta responsif terhadap dinamika lapangan.",
    strengths: ["Berani & Tegas", "Rasional & Pragmatis", "Keterampilan Komunikasi Hebat", "Peka Terhadap Perubahan"],
    weaknesses: ["Kurang Sabar Terhadap Teori", "Suka Mengambil Risiko", "Tidak Suka Aturan Kaku", "Sering Mengabaikan Detail Prosedur"],
    careers: ["Wirausahawan / Founder", "Sales & Marketing Lead", "Pialang / Trader", "Spesialis Negosiasi Bisnis"],
    leadershipStyle: "Kepemimpinan berorientasi hasil yang cepat merespons peluang bisnis baru di pasar.",
    workplaceFit: "Lingkungan kerja bertempo tinggi, berorientasi target penjualan, dan penuh tantangan."
  },
  ESFP: {
    title: "Penghibur / Sosialis (Performer)",
    desc: "Orang yang spontan, energik, bersemangat, dan selalu mencairkan suasana tim menjadi ceria, kolaboratif, dan penuh energi.",
    strengths: ["Antusias & Menarik", "Suka Membantu Secara Praktis", "Kemampuan Sosial Luar Biasa", "Adaptif & Menyenangkan"],
    weaknesses: ["Mudah Merasa Bosan", "Sulit Merencanakan Masa Depan Jangka Panjang", "Kurang Suka Analisis Rumit", "Menhindari Konflik"],
    careers: ["Event Planner / PR Manager", "Talent Acquisition Specialist", "Public Relations", "Pemandu & Facilitator"],
    leadershipStyle: "Kepemimpinan energik yang membangun antusiasme dan keterlibatan aktif seluruh tim.",
    workplaceFit: "Tim kerja interaktif, penuh aktivitas sosial, dan berorientasi pada pelayanan pelanggan."
  },
  ENFP: {
    title: "Juru Kampanye / Inspirator (Champion)",
    desc: "Jiwa yang bebas, antusias, kreatif, komunikator ulung, dan selalu menemukan potensi ide baru untuk memajukan tim.",
    strengths: ["Sangat Kreatif & Inovatif", "Penuh Energi Positif", "Komunikator Ulung", "Ramah & Mudah Bergaul"],
    weaknesses: ["Sulit Menjaga Fokus Pada Rutinitas", "Sangat Butuh Validasi", "Cenderung Overthinking", "Cepat Terdistraksi"],
    careers: ["Content Creator / Brand Strategist", "Jurnalis & Media Specialist", "Manajer Pemasaran Kreatif", "Motivator Organisasi"],
    leadershipStyle: "Kepemimpinan inspiratif yang membangun budaya kerja kreatif dan penuh semangat inovasi.",
    workplaceFit: "Agensi kreatif atau startup dinamis yang menghargai keberanian mencoba ide-ide baru."
  },
  ENTP: {
    title: "Debat / Visioner (Visionary)",
    desc: "Pemikir cerdas yang tidak bisa menolak tantangan intelektual, suka menganalisis argumen dan merancang ide disrupsi.",
    strengths: ["Sangat Cerdas & Cepat Berpikir", "Karismatik & Komunikatif", "Solutif & Solusi Baru", "Melihat Gambaran Besar"],
    weaknesses: ["Suka Berdebat Hingga Melelahkan", "Kurang Toleran Terhadap Inefisiensi", "Sulit Eksekusi Rutin", "Sensitivitas Rendah"],
    careers: ["Konsultan Bisnis Strategis", "Pengacara / Advocate", "Product Manager", "Wirausahawan Disruptif"],
    leadershipStyle: "Kepemimpinan disruptif yang menantang batas-batas konvensional demi terobosan baru.",
    workplaceFit: "Lingkungan kompetitif, penuh inovasi produk, dan ruang debat ide secara terbuka."
  },
  ESTJ: {
    title: "Eksekutif / Administrator (Supervisor)",
    desc: "Administrator ulung, tidak tertandingi dalam mengelola proses, aturan, standar operasional, dan kepemimpinan tim.",
    strengths: ["Sangat Terorganisir & Efisien", "Setia & Berdedikasi Tinggi", "Jujur, Tegas & Terpercaya", "Penegak Ketertiban"],
    weaknesses: ["Cenderung Kaku Terhadap Perubahan", "Keras Kepala", "Terlalu Menuntut Standar Tinggi", "Kurang Ekspresif Emosi"],
    careers: ["Manajer Proyek Utama", "Direktur Operasional", "Kepala Cabang / Audit", "Administrator Eksekutif"],
    leadershipStyle: "Kepemimpinan komando terstruktur yang mengutamakan ketertiban, kejelasan tanggung jawab, dan hasil.",
    workplaceFit: "Perusahaan korporasi mapan dengan struktur hierarki jelas dan prosedur operasi standar (SOP)."
  },
  ESFJ: {
    title: "Konsul / Penyedia (Provider)",
    desc: "Pribadi yang sangat sosial, peduli, populer, dan selalu bersemangat membantu sesama serta menjaga kekompakan komunitas.",
    strengths: ["Rasa Tanggung Jawab Kuat", "Sangat Setia & Peduli", "Hebat Menjalin Hubungan Sosial", "Hangat & Suportif"],
    weaknesses: ["Khawatir Terhadap Status Sosial", "Butuh Banyak Pujian / Pengakuan", "Enggan Menghadapi Perubahan Keras", "Menolak Konflik"],
    careers: ["Manajer HRD & Talent Management", "Public Relations Officer", "Koordinator Pelatihan & Event", "Spesialis Pelayanan Pelanggan"],
    leadershipStyle: "Kepemimpinan berbasis persatuan tim yang mengutamakan komunikasi terbuka dan kesejahteraan bersama.",
    workplaceFit: "Budaya perusahaan yang berfokus pada kolaborasi harmonis dan nilai-nilai pelayanan."
  },
  ENFJ: {
    title: "Protagonis / Pemimpin Karismatik (Teacher)",
    desc: "Pemimpin karismatik yang penuh inspirasi, mampu memikat pendengar dan memotivasi tim untuk mencapai potensi terbaik mereka.",
    strengths: ["Sangat Karismatik & Persuasif", "Sangat Peduli & Tulus", "Komunikator Ulung", "Pemimpin Alami"],
    weaknesses: ["Terlalu Idealistis", "Terlalu Peka Terhadap Kritik", "Sering Mengorbankan Diri", "Ragu Dalam Keputusan Keras"],
    careers: ["Pemimpin Organisasi / Executive", "Guru / Profesor Utama", "Konselor Organisasi", "Manajer Komunikasi Strategis"],
    leadershipStyle: "Kepemimpinan inspiratif dan inklusif yang memberdayakan seluruh tim untuk berkembang bersama.",
    workplaceFit: "Organisasi berbasis misi yang mengutamakan kolaborasi tim, pengembangan talenta, dan dampak positif."
  },
  ENTJ: {
    title: "Komandan / Pemimpin Strategis (Fieldmarshal)",
    desc: "Pemimpin visioner yang berani, bertekad kuat, selalu menemukan jalan atau menciptakan jalan baru untuk kesuksesan bisnis.",
    strengths: ["Sangat Efisien & Taktis", "Percaya Diri Tinggi", "Bertekad Kuat & Pantang Menyerah", "Pemikir Strategis Handal"],
    weaknesses: ["Keras Kepala", "Kurang Sabar Terhadap Lambatnya Proses", "Kurang Peka Terhadap Perasaan Tim", "Terlihat Dominan"],
    careers: ["CEO / Direktur Utama", "Konsultan Manajemen Senior", "Venture Capitalist / Investor", "Pemimpin Transformasi Digital"],
    leadershipStyle: "Kepemimpinan visioner dan tegas yang berfokus pada pertumbuhan agresif dan efisiensi eksekusi.",
    workplaceFit: "Perusahaan yang sedang tumbuh pesat, penuh tantangan strategis, dan berpatokan pada indikator keberhasilan."
  }
};
