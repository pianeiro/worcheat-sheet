\version "2.25.35"

#(set-default-paper-size "a5")
#(set-global-staff-size 19)

\header {
  title= "Doce Presencia"
  %subtitle= ""
  composer= "Márcio Santana"
  %poet = ""
  %copyright= "OPD (on behalf of Onimusic); Abramus Digital, LatinAutor, LatinAutorPerf, and 1 Music Rights Societies"
  tagline= "Como tocado em: https://youtu.be/ArApzuYZ33Q"
}

md = \mark \default
empty = { \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}}
emptyAnt = { \fixed c' {\improvisationOn \hide Stem b4 4 \undo \hide Stem \appoggiatura b8 \hide Stem 4 4 \undo \hide Stem \improvisationOff}}
%coda = {\mark \markup { \musicglyph #"scripts.coda" }}



melody = \relative c' {

  \key d \major

  \md
  \repeat percent 2 {\empty \empty}
  \repeat unfold 12 \empty

  \repeat percent 2 {\empty \empty}
  \empty
  \improvisationOn
    \hide Stem b'4 4 \undo \hide Stem
    b8 8 8 8
  \improvisationOff
  \repeat unfold 10 \empty
  \break

  \md
  \repeat volta 2 {
    \repeat unfold 3 \empty
  } \alternative {
    \volta 1 \empty
    \volta 2 \empty
  }
  \break

  \md
  \repeat percent 2 {\empty \empty}
  \empty
  \improvisationOn
    \hide Stem b4 4 \undo \hide Stem
    b8 8 8 8
  \improvisationOff
  \empty \empty
  \improvisationOn
    \repeat unfold 6 {b8 8}
    \hide Stem
      b4 4  4 4 4 4 4 4
    \undo \hide Stem
    b2
  \improvisationOff
  \repeat unfold 4 \empty
  \break



}

harmony = \chordmode {

  \repeat percent 2 {b2:m7 g d1}
  cis2:m7.5- fis:aug7 b1:m7 e:7 g/a
  b2:m7 g d1 cis2:m7.5- fis:aug7 b1:m7
  b2:m7 fis:aug7 b2:m7 e:7
  e4:m7 d/fis g2/a d/a g 
  \bar "||"
  \break

  \repeat percent 2 {b2:m7 g d1}
  cis2:m7.5- fis:aug7 b2:m7~8 a8/cis d d/fis
  d2/e e/d a/cis g/a 
  b2:m7 g d1 cis2:m7.5- fis:aug7 b1:m7
  b2:m7 fis:aug7 b2:m7 e:7
  e:m7 g/a d g/a \bar "||"

  %B
  \repeat volta 2 {
    d2 g d/fis a/b e:m7 g/a
  } \alternative {
    \volta 1 {d g/a}
    \volta 2 {d2 g4/b g/a}
  }

  % C
  \repeat percent 2 {b2:m7 g d1}
  cis2:m7.5- fis:aug7 b2:m7~8 a8/cis d d/fis
  d2/e e/d g1/a
  d2 g:m6/d d1 cis2:m7.5- fis:aug7 b2:m7 fis:aug7
  b2:m7 fis:aug7 b2:m7 e:7
  e:m7 g/a d g/a \bar "||"




}

\score {
  <<
    \new ChordNames {
      \set additionalPitchPrefix = #"add"
      \set chordChanges = ##t
      \harmony
    }
    \new Staff {
      %\tempo "Adagietto" 4 = 64
      \melody
    }
  >>
  \layout{}
  \midi{}
}