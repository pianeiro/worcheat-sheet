% \version "2.22.2"

#(set-default-paper-size "a5")

\header {
 title = "Não há Deus Maior"
 % composer = "Brás Adoração"
 copyright = "Como tocado em https://youtu.be/ubm9GK8jf84?si=-wTrliINom4ZI-x8"
}


md = \mark \default
empty = \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}
segno = {\mark \markup { \musicglyph #"scripts.segno" }}
coda = {\mark \markup { \musicglyph #"scripts.coda" }}

melody = \relative c'' {
  \mark "Intro"
 \repeat volta 2 {
   b4 ais gis fis dis1
   b'4 ais gis fis dis2 e
 } fis1

 \md

 \repeat volta 2 {
   \repeat unfold 7 \empty
 } \alternative {
   {b4 ais gis fis dis1}
   {\empty}
 }

 \md
 \repeat unfold 3 \empty
 \improvisationOn b'2 b4 b \improvisationOff

 \md
 \repeat percent 2 {
   \improvisationOn b4. b b4 \improvisationOff
 }
 \time 6/4 {
   \improvisationOn
     b2 b2. b4
   \improvisationOff
 }
 \time 4/4
 \md
 \repeat unfold 7 \empty

 \md
 b4 ais gis fis dis1
 b'4 ais gis fis dis'2 cis

}

harmony = \chordmode {

 % Intro
 \repeat volta 2 {b1 b cis:m7 e} e

 % A
 \repeat volta 2 {
   b1 cis:m7 fis b gis:m7 cis:m7 f:sus
 } \alternative {
   {b b}
   {b}
 }

 % B
 dis2:sus4 dis2/g gis1:m7
 dis/g gis2:m7 fis4/ais b

 % C
 \repeat percent 2 {
   cis4.:m7 f4.:sus gis4:sus
 }
 \time 6/4 cis2:m7 fis2. b4/dis \time 4/4

}

\score {
 <<
   \new ChordNames {
     \set chordChanges = ##t
     \harmony
   }
   \new Staff {
     \key b \major
     \melody
   }
 >>

}