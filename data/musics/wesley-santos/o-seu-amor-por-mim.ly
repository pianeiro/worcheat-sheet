\version "2.25.35"

#(set-default-paper-size "a4")

\header {
title = "O seu amor por mim"
composer = "Wesley Santos"
copyright = "Como tocado em https://youtu.be/7UI8K9U6_Vw"
}


md = \mark \default
empty = \fixed c' {\improvisationOn \hide Stem b4. 4. \undo \hide Stem \improvisationOff}
segno = {\mark \markup { \musicglyph #"scripts.segno" }}
coda = {\mark \markup { \musicglyph #"scripts.coda" }}

melody = \relative c'' {
  \key fis \major
  \time 6/8

  \mark "Intro"
  \repeat percent 2 {r16 ais8 fis' eis ais, fis'8.}
  \repeat percent 2 {r16 b,8 fis' dis b ais'8.}
  \repeat percent 2 {r16 ais,8 fis' eis ais, fis'8.}
  r16 b,8 gis' cis, cis gis'8. \empty

  \break
  \md
  \repeat unfold 14 \empty \improvisationOn b,2 b4^\fermata \improvisationOff 
  \empty \improvisationOn b4.^\fermata \improvisationOff fis'8^"on cue" eis cis

  \break
  \md
  \repeat unfold 16 \empty

  \break
  \md
  fis4.^"coll' 8va"\startTextSpan  eis cis dis gis fis ais2.\stopTextSpan 

  \break
  \mark "A2"
  \repeat volta 2 {
    \repeat unfold 8 \empty
  }
  \repeat unfold 4 \empty

  \break
  \segno
  \repeat volta 2 {
    \repeat unfold 7 \empty
    \improvisationOn
      \hide Stem
        b,4. b^"to Coda"
      \undo \hide Stem
    \improvisationOff 
  
  }

  \break
  \md
  \repeat volta 4 {
    \empty \tuplet 4/6 {\improvisationOn b,8 8 8 8 \improvisationOff}
    \alternative {
      \volta 1,2,3 {\empty \empty}
      \volta 4 {\improvisationOn b2.~b2. \improvisationOff}
    } 
  }

  \break
  \md 
  \improvisationOn 
    \repeat percent 4 {b4. b} 
    \repeat percent 7 {b8 8 8 8 8 8}
    b4.^"D.S. al coda" r4.
  \improvisationOff
  \coda
  \bar "||" \improvisationOn b2.^\fermata \improvisationOff \fine

}

harmony = \chordmode {
  % Intro.
  fis1. b/fis fis b:6/fis

  % A
  fis1. b/dis fis1. b/dis fis b:maj7/dis dis2.:m7 fis4. fis/ais b2. gis1.:m7

  %B
  fis1. b:9/dis dis2.:m7 cis:9 b1.:9
  fis1. b:9/dis dis2.:m7.11 fis4.:maj7 fis/ais b1.:9

  %C
  fis1.:maj7 b:maj7

  %A2
  \repeat volta 2 {fis1. b dis2.:m7 cis b1.:9} gis1.:m7 b:9
    
  %B2
  \repeat volta 2 {fis1. b dis2.:m7 cis b1.:9}

  %D
  \repeat volta 4 {
    dis2.:m7 fis
    \alternative {
      \volta 1,2,3 {b1.:9}
      \volta 4 {b1.:9}
    }
  }

  %E
  \repeat volta 2 {gis1.:m7 b:9}
  gis2.:m7 gis4.:m7 dis4.:m7 gis1.:m7
  \repeat unfold 4 b1.:9 

  b2.:9

}

\score {
<<
  \new ChordNames {
    \set chordChanges = ##t
    \harmony
  }
  \new Staff {
    \melody
  }
>>

}
