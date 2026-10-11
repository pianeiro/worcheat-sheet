\version "2.25.35"

#(set-default-paper-size "a5")
#(set-global-staff-size 19)

\header {
  title= "Aleluia"
  %subtitle= ""
  composer= "Get Worship"
  %poet = ""
  %copyright= "OPD (on behalf of Onimusic); Abramus Digital, LatinAutor, LatinAutorPerf, and 1 Music Rights Societies"
  tagline= "Como tocado em: https://youtu.be/oGLyLr7lyMQ"
}

md = \mark \default
empty = { \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}}
halfEmpty = { \fixed c' {\improvisationOn \hide Stem b4 4 \undo \hide Stem \improvisationOff}}
emptyAnt = { \fixed c' {\improvisationOn \hide Stem b4 4 \undo \hide Stem \appoggiatura b8 \hide Stem 4 4 \undo \hide Stem \improvisationOff}}
%coda = {\mark \markup { \musicglyph #"scripts.coda" }}



melody = \relative c' {
  %\override MultiMeasureRest.expand-limit = #20

  \mark "Intro"
  \key b \major
  
  \compressMMRests {
    R1*4
    \bar "||"
    R1*16
  }

  \md \bar "||" \repeat unfold 8 \empty \bar "||" \break

  \repeat segno 2 {
    \repeat unfold 8 \empty \break 

    \md \bar "||"
    \repeat percent 4 {b16 dis fis b~8 ais gis4 fis b,16 dis fis b r2.}
    \break

    \md \bar "||"
    \repeat percent 4 {\empty \empty} \break
  }

  \md
  \repeat volta 2 \repeat percent 4 {\empty \empty}
  \empty \empty \break \bar "||"

  \md
  \improvisationOn b1 1 \improvisationOff
  \empty \empty
  \improvisationOn
    \repeat percent 3 {\repeat unfold 8 b8}
    b4\staccato r2.
  \improvisationOff
  \break

  \md \repeat volta 2 \repeat percent 2 {\empty \empty} \break

  \md \repeat volta 2 \repeat percent 2 {\empty \empty} \break

  \md \repeat percent 2 {\empty \empty} \break

  \md \repeat percent 4 {b,16 dis fis b~8 ais gis4 fis b,16 dis fis b r2.} \bar "|."


}

harmony = \chordmode {

  % Prelude
  r1*4 r1*16

  % A
  b1 b1 b2 e fis1 gis2:m7 e b fis gis2:m7 e b1

  \repeat segno 2 {
    b2 e b1 b2/dis e fis1 gis2:m7 e b fis gis:m7 e b1

    %B
    \repeat percent 4 {gis2:m7 e b1}

    %C
    \repeat percent 4 {gis2:m7 e b1}

  }

  % D
  \repeat votla 2 \repeat percent 4 {gis2:m7 e b fis}
  gis2:m7 e b fis

  % E
  b1 b:sus4 gis2:m7 e b fis
  b1 b:sus4 gis2:m7 e b1

  % F
  \repeat volta 2 \repeat percent 2 {gis2:m7 e b fis}

  % G
  \repeat volta 2 \repeat percent 2 {gis2:m7 e b fis}

  % H
  \repeat percent 2 {gis2:m7 e b fis}

  % J
  \repeat percent 4 {gis2:m7 e b1}
  
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