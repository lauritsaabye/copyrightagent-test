# color-util documentation
color-util is a command-line tool for converting colors from a readable string to their HEX and RGB representations. It supports sequential and parallel conversion of a list of colors.

Colors are converted by an external API, which currently supports conversion of the following colors:
* black
* white
* blue
* green
* red

### Setup

To use color-util, you need to install its dependencies using:

`npm i`

Then link the binary using:

`npm link`

To run the CLI, use the following command structure:

`color-util [command] [options] [arguments]`

## Commands

`convert`

This command converts a list of colors into their HEX and/or RGB representations. 
You can specify whether you want the **HEX** representation using `-h` or `--hex` and/or 
the **RGB** representation using `-r` or `--rgb`. _You can even get both representations at once!_ 
If no flags are provided, the convert command will simply return the inputted colors. 

The convert command requires you to specify the computational method of the color conversion using one of the following subcommands.

### Subcommands

---
`convert seq`

This subcommand converts colors sequentially, in the order they appear in the inputted list of colors. 
Each color will be converted and outputted to `stdout` before moving to the next color in the list. 
_Use the flags stated in the parent command: `-h` and `-r`._

**Syntax:**

`color-util convert seq <colors...> [options]`

**Example:**

Convert red and blue colors to HEX sequentially:

`color-util convert seq red blue --hex`

Output:

```
{"name": "red","hex": "#ff0000"}
{"name": "blue","hex": "#0000ff"}
```
---
`convert par`

This subcommand converts colors in parallel. All colors will be converted before the entire list is written to `stdout`. 
The order of the inputted list of colors is retained in the `stdout` output.
_Use the flags stated in the parent command: `-h` and `-r`._

**Syntax:**

`color-util convert par <colors...> [options]`

**Example:**

Convert red and blue colors to RGB and HEX in parallel:

`color-util convert par red blue --rgb --hex`

Output:

```
[
    {
        "name": "red",
        "rgb": { R: 255, G: 0, B: 0 } 
        "hex": "#ff0000"
    },
    {
        "name": "blue",
        "rgb": { R: 0, G: 0, B: 255 } 
        "hex": "#0000ff"
    }
]
```