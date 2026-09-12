\version "2.25.35"

#(set-default-paper-size "a5")
#(set-global-staff-size 19)

\header {
  title= "Vem com o peso da tua glória"
  %subtitle= ""
  composer= "Débora Reis"
  %poet = ""
  %copyright= "OPD (on behalf of Onimusic); Abramus Digital, LatinAutor, LatinAutorPerf, and 1 Music Rights Societies"
  tagline= "Como tocado em: https://youtu.be/10vlGwga20c"
}

md = \mark \default
empty = { \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}}
halfEmpty = { \fixed c' {\improvisationOn \hide Stem b4 4 \undo \hide Stem \improvisationOff}}
emptyAnt = { \fixed c' {\improvisationOn \hide Stem b4 4 \undo \hide Stem \appoggiatura b8 \hide Stem 4 4 \undo \hide Stem \improvisationOff}}
%coda = {\mark \markup { \musicglyph #"scripts.coda" }}



melody = \relative c' {

  \key d \major

  \mark "Intro"
  b'2. b8 d cis2. b8 d e d b2 b8 d e d b2  a'8 g fis2. e8 d cis2. b8 d e d b2 b8 d e d b4 a fis
  \break

  % A
  \md
  \repeat volta 2  {
    e1 \repeat unfold 4 \empty
  }
  \break

  % B
  \md
  \repeat percent 2 {\empty \empty}
  \empty \empty
  \time 2/4 \halfEmpty
  \time 4/4 \empty \empty
  \break

  % C
  \md
  b'2. b8 d cis2. b8 d e d b2 b8 d e d b2  a'8 g
  \break

  % D
  \md
  \repeat volta 2  {
    fis1 \repeat unfold 3 \empty
  } \alternative {
    \volta 1 \empty
  }

  % E
  \break \md
  \repeat volta 2 {
    \repeat percent 2 {\empty \empty}
    \empty \empty
    \time 2/4 \halfEmpty
    \time 4/4 \empty \empty
    \improvisationOn
      \repeat unfold 8 b,8
    \improvisationOff
    \break
  }
  \break

  % F
  \md
  \improvisationOn
    \repeat unfold 16 b8
    \repeat unfold 16 b16
  \improvisationOff
  \break

  % G
  \md
  \repeat percent 2 {
    \improvisationOn
      b2 2 1
    \improvisationOff
  }
  \empty \empty
  e,8 d e d e e~4
  fis8 e fis e fis ais cis4
  \break
  
  % H
  \md
  \repeat percent 2 {\empty \empty}
  \empty \empty
  \time 2/4 \halfEmpty
  \time 4/4 \empty \empty
  \improvisationOn
    \repeat unfold 8 b8
  \improvisationOff
  
  \empty \empty \empty
  \improvisationOn
    b8
  \improvisationOff
  fis16 e fis g a8~2
  \empty \empty
  \time 2/4 \halfEmpty
  \time 4/4
  \improvisationOn
    \repeat unfold 8 b8
  \improvisationOff

  \time 2/4 \halfEmpty
  \time 4/4 \empty \empty
  \break

  \md
  \repeat volta 2 {
    \repeat unfold 3 \empty
    \improvisationOn
      \hide Stem
        b4 4 4 4^"on cue"
      \undo \hide Stem
    \improvisationOff
  }
  \break

  \md
  \repeat volta 2 {
    \improvisationOn \repeat unfold 4 \repeat unfold 16 b16 \improvisationOff
  }

}

harmony = \chordmode {

  % Intro
  b1:m7 a:6 g e:m7 b1:m7 a:6 g e:m7 

  % A
  b:m7 a:6 g2 f:m7 b1:m7~1

  % B
  \repeat percent 2 {g2 a b1:m7}
  g2 a b:m7 d/fis g a1 g2 a

  % C
  b1:m7 a:6 g e:m7

  % D
  \repeat volta 2 {
    b1:m7 a:6 g2 fis:m7 b1:m7
  } \alternative {
    \volta 1 {b1:m7}
  }

  % E
  \repeat volta 2 {
    \repeat percent 2 {g2 a b1:m7}
    g2 a b:m7 d/fis g a1 g2 a b1:m7
  }

  % F
  a1:6 g a

  % G
  \repeat percent 2 {g2 a b1:m7}
  g2 d g d e1:m7 fis:7

  % H
  \repeat percent 2 {g2 a b1:m7}
  g2 a b:m7 d/fis g a1 g2 a b1:m7

  g2 a b1:m7 g2 a b1:m7 g2 a b:m7 d/fis g a1

  g2 a1 g2 a

  \volta 2 {b1:m7 a:6 g e:m7}
  \volta 2 {b1:m7 a:6 g e:m7}

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