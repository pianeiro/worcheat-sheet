\version "2.25.35"

#(set-default-paper-size "a5")
#(set-global-staff-size 19)

\header {
  title= "Quem é esse?"
  %subtitle= ""
  composer= "Julliany Souza"
  %poet = ""
  %copyright= "OPD (on behalf of Onimusic); Abramus Digital, LatinAutor, LatinAutorPerf, and 1 Music Rights Societies"
  tagline= "Como tocado em: https://youtu.be/0ZF5em0MTwY"
}

md = \mark \default
empty = { \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}}
halfEmpty = { \fixed c' {\improvisationOn \hide Stem b4 4 \undo \hide Stem \improvisationOff}}
emptyAnt = { \fixed c' {\improvisationOn \hide Stem b4 4 \undo \hide Stem \appoggiatura b8 \hide Stem 4 4 \undo \hide Stem \improvisationOff}}
%coda = {\mark \markup { \musicglyph #"scripts.coda" }}



melody = \relative c' {

  \key fis \major
  \mark "Intro"
  dis2 cis'8. fis,16~8 gis8~2 cis8. eis,16~8 fis8~2 cis'8. eis,16~8 fis8~1
  \break

  \md \repeat volta 2 \repeat unfold 4 \empty \break

  \md
  \repeat volta 2 \repeat unfold 4 \empty 
  \empty \empty \break

  \md
  \repeat unfold 8 \empty \break

  \md
  dis2 cis'8. fis,16~8 gis8~2 cis8. eis,16~8 fis8~2 cis'8. eis,16~8 fis8~1
  \break

  \md
  \repeat volta 2 \repeat unfold 4 \empty 
  \empty \empty \break

  \md
  \repeat volta 2 {\repeat unfold 6 \empty}
  \alternative {
    \volta 1 {\empty \empty}
    \volta 2 {
      \improvisationOn
        \repeat unfold 8 b4
      \improvisationOff
    }
  }
  \break

  \md
  \repeat volta 2 \repeat unfold 4 \empty \break
  \repeat volta 2 {\improvisationOn \repeat unfold 16 {b8 8} \improvisationOff}
  \improvisationOn
    \repeat unfold 4 {b8 8}
    \repeat unfold 4 {b16 b b b}
  \improvisationOff
  \break

  \key aes \major
  \bar "||"
  \md
  \compressMMRests R1*2
  \repeat unfold 12 \empty
    \improvisationOn
    \repeat unfold 4 {b8 8}
    \repeat unfold 4 {b16 b b b}
  \improvisationOff
  \break

  \md
  \improvisationOn
    r4 b2. r4 b2. r4 b4 4 4 8 8 8 8 8 8 8 8
  \improvisationOff
  \repeat volta 2 \repeat unfold 4 \empty \break

  \md
  \improvisationOn
    b1 1 1 1
  \improvisationOff
  \break

  \md
  
  \improvisationOn
    \repeat volta 2 {
      b1 1 1 1^"(on cue)"
    }
    b1\fermata \bar "|."
  \improvisationOff

}

harmony = \chordmode {

  % Intro
  b1:maj7 cis dis:m7 ais:m7

  % A
  \repeat volta 2 {b1:maj7 cis ais:m7 dis:m7}
  
  %B
  \repeat volta 2 {b1:maj7 cis ais:m7 dis:m7}
  gis2:m7 a:m7 b1:maj7  

  % C
  fis\breve dis:m7 b1:maj7 gis:m7 fis/cis cis

  % D
  b1:maj7 cis dis:m7 ais:m7

  % E
  \repeat volta 2 {b1:maj7 cis ais:m7 dis:m7}
  gis2:m7 a:m7 b1:maj7 

  % F
  \repeat volta 2 {
    fis\breve dis:m7 b1:maj7 gis:m7
  } \alternative {
    \volta 1 {fis/cis cis}
    \volta 2 {fis/cis cis}
  }

  % G
  \repeat volta 2 {b1:maj7 cis dis:m7 ais:m7}
  \repeat volta 2 {b1:maj7 cis dis:m7 ais:m7}
  gis2:m7 ais:m7 cis dis

  % H
  R1*2 ees\breve:m7 des:maj7 aes1/ees ees
  aes\breve ees\breve:m7 des:maj7 aes1/ees bes2:m7 ees

  % J
  s4 des2. s4 ees2.  s4 f2.:m7 c1:m7
  \repeat volta 2 {des ees f:m7 c:m7}

  % K
  des:maj7 ees f:m7 c:m7

  % I
  \repeat volta 2 {des:maj7 ees f:m7 c:m7} des:maj7
  
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