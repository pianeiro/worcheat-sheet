\version "2.25.35"

#(set-default-paper-size "a5")
#(set-global-staff-size 19)

\header {
  title= "Amém"
  %subtitle= ""
  composer= "O Canto das Igrejas"
  %poet = ""
  %copyright= "OPD (on behalf of Onimusic); Abramus Digital, LatinAutor, LatinAutorPerf, and 1 Music Rights Societies"
  tagline= "Como tocado em: https://youtu.be/61gkDaBvQTo"
}

md = \mark \default
empty = { \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}}
halfEmpty = { \fixed c' {\improvisationOn \hide Stem b4 4 \undo \hide Stem \improvisationOff}}
emptyAnt = { \fixed c' {\improvisationOn \hide Stem b4 4 \undo \hide Stem \appoggiatura b8 \hide Stem 4 4 \undo \hide Stem \improvisationOff}}
%coda = {\mark \markup { \musicglyph #"scripts.coda" }}



melody = \relative c' {

  \key d \major

  \compressMMRests R1*2 s1*0^"(EP FM + Pad)"
  \mark "Intro"
  \bar "||"
  \empty \emptyAnt \empty \emptyAnt \empty
  \improvisationOn
    \hide Stem
      b'4 4 \undo \hide Stem \appoggiatura b8 \hide Stem 4
    \undo \hide Stem
    b4
  \improvisationOff
  \break

  \md
  \bar "||" s1*0^"(pad)" 
  \repeat unfold 14 \empty
  \improvisationOn
    b2 2 2 4 4~1~1
  \improvisationOff
  \break

  \md \bar "||"
  s1*0^"(EP FM)"
  \repeat unfold 7 \empty \emptyAnt
  \repeat unfold 4 \empty
  \break

  \md
  \bar "||"
  \empty \emptyAnt \empty
  \improvisationOn
    \hide Stem
      b4 4 \undo \hide Stem \appoggiatura b8 \hide Stem 4
    \undo \hide Stem
    b4
  \improvisationOff
  \break

  \md
  \bar "||"
  \improvisationOn
    \repeat percent 3 {r1 r4. b4. 4}
    b2 2 2 4 4
  \improvisationOff
  \break
  \repeat percent 2 {\empty \emptyAnt} \empty \empty
  \improvisationOn
    b2 2 2 4 4~1~1
  \improvisationOff
  \break

  \md
  \repeat volta 2 {
    \repeat unfold 7 {\empty} \emptyAnt
    \repeat unfold 4 \empty
  } \alternative {
    \volta 1 {\break \repeat unfold 4 \empty}
    \volta 2 {\break \repeat percent 2 {\empty \emptyAnt}}
  }
  \break

  \md
  \bar "||"
  \repeat unfold 4 {
    \improvisationOn
      b1~1
    \improvisationOff
  }
  \break
  \repeat volta 2 \repeat unfold 8 \empty
  \repeat percent 4 {
    \improvisationOn
      b8-> 8 8 8-> 8 8 8-> 8
    \improvisationOff
  }
  \break

  \md
  \improvisationOn
    \repeat unfold 3 {b1~1} b1~2 2 b1~1
    \repeat percent 4 {b16 b b b} \bar"||"
    \repeat percent 3 {b8. 16~8 8~16 8. 4 }
  \improvisationOff
  \empty
  \break

  \md \bar "||"
  \repeat unfold 7 \empty \emptyAnt
  \repeat unfold 8 \empty \bar "||"
  \repeat unfold 2 \empty
  \improvisationOn
    \hide Stem
      b4 4 4
    \undo \hide Stem
    b4
  \improvisationOff
  r1\fermata \bar "|."
}

harmony = \chordmode {

  % Intro
  R1*2 
  d1 d4. g8~2 d1 d4. g8~2 b1:m7 b4.:m7 g4. d4

  % A
  d1 1 1 1 1 1 g1 1
  d1 1 1 1 b\breve:m7
  g2 a g/b d4:sus4 d~1~1

  % B
  g\breve:maj7 a/cis b:m7~1~4. a8~2
  g\breve:maj7 a

  % c
  d1 d4. d4.:sus4 d4 d1 b4.:m7 g4./b d4

  % D
  \repeat percent 3 {s1~4. g4./d d4}
  g2 a b:m7 d4:sus4 d
  \repeat percent 2 {d1 d4. g8/d~2} b\breve:m7
  g2 a b:m7 d4:sus4 d~1~1

  % E
  \repeat volta 2 {
  g\breve:maj7 a/cis b:m7~1~4. a8~2
  g\breve:maj7 a
  } \alternative {
    \volta 1 {b:m7 d:maj7}
    \volta 2 {\repeat percent 2 {d1:maj7~4. g8/d~2}}
  }

  % F
  d\breve g:maj7 b:m7 g
  \repeat volta 2 {d\breve g:maj7 b:m7 g}
  d1 1 1 1

  % G
  g\breve:maj7 a/cis b:m7~1. a2:6
  g\breve:maj7 a1:sus4 d1 1 1 1

  % H
  g\breve:maj7 a/cis b:m7~1~4. a8~2
  g\breve:maj7 a b:m7 d:maj7 g\breve:maj7 a 


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