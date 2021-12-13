import html from 'hyperlit'

const PerfusionView = (state) => html`
<p>
    Patientenparameter aktuell:<br>
    Körpergrösse: ${state.groesse} cm<br>
    Körpergewicht: ${state.gewicht} kg<br>
    Körperoberfläche: x,x qm<br>
</p>
<p>
    Untersuchung in folgenden Sequenzen<br>
    Axiale SSh/T2/TSE,<br>
    SSFP in SA, 4-CH, 2-CH<br>
    Perfusion in SA mit jeweils 0,075 mmol/kgKG ml Gadovist i.v. in Stress (400 µg Regadenoson i.v.) und Ruhe.<br>
    DE-Sequenzen nach insgesamt $(Körpergewicht * 0,15 Format: XX,X) ml Gadovist-Gabe i.v. in SA, 4-CH.<br>
</p>

<p>
    Befund:<br>
    Es liegt keine Voruntersuchung zum Vergleich vor.<br>
    Morphologie: Links deszendierende Aorta mit regelrechtem Abgang der supraaortalen Gefäße. Aorta ascendens mit
    normalkalibrig. In den SSFP normal großer linker und rechter Ventrikel. Kein Perikarderguss, kein Pleuraerguss.
</p>
<p>
    CINE-MRT: Visuell gute linksventrikuläre Funktion. Keine regionalen Wandbewegungsstörungen in Ruhe oder unter
    Belastung.<br>
    Keine path. Dephasierungsartefakte über den AV-Klappen.<br>
</p>
<p>
    LV Parameter nach Simpsons Scheibchen-Summationsmethode, Normwerte in Klammern, Volumina und Masse normiert auf die
    Körperoberfläche:
    $EF 50 % (47 - 70 %)¹; $EDV/BSA 58 ml/m² (60 - 112 ml/m²)¹; $ESV/BSA 29 ml/m² (21 - 51 ml/m²)¹; $LV-Masse/BSA 29
    g/m²
    (36 - 73 g/m²)¹;
    LV-Absolutwerte:
    $EDV 120 ml (109 - 232 ml)¹; $ESV 60 ml (39 - 103 ml)¹; $SV 60 ml (58 - 140 ml)¹; $LV Masse 60 g (64 - 148 g)¹;

    Petersen et al. 2017; // hier sollten später die Normwerte anpassbar sein, initiale Auswahl mit erinnerbarem
    Standard

    Regadenoson Belastung: Anstieg der Herzfrequenz von xx /min auf 100 /min, Blutdruckänderung (Abfall/Anstieg) von
    xxx/xx
    mmHg auf xxx/xx mmHg. Dabei während der ersten Minuten Wärmegefühl sowie geringes thorakales Druckgefühl und
    Unwohlsein,
    gegen Ende der Untersuchung vollständig regredient. Keine Thoraxschmerzen.
    Perfusionsanalyse (visuell): Im Rahmen der Regadenosonbelastung zeigt sich kein Perfusionsdefizit.

    Late Enhancement: Kein Nachweis eines Late Enhancements.
</p>

<p>
    Beurteilung:

    Kein Nachweis eines stressinduzierten Perfusionsdefizits im vitalen Myokard.
    Kein Nachweis einer Fibrose, Nekrose oder Narbe
    (Vergrößerter/dilatierter/normal großer LV mit $EFwort LV-Funktion (LV-EF XX %)

    //zur Erklärung
    // LV EF: EFwort
    //LVEF: >70 % hypernormaler, 70-60% normaler, 59-50% erhaltener, 49-40% geringgradig eingeschränkter, 39-30
    reduzierter,
    29-15 hochgradig reduzierter, &lt; 15 höchstgradig reduzierter </p>

`

export {
    PerfusionView
}