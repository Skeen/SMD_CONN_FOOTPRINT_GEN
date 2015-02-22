var spawn = require('child_process').spawn;
var fs = require('fs');

// The number of nodes to spawn
var pin_max = parseInt(process.argv[2]);
var pin_width = parseFloat(process.argv[3]);
var output_dir = "output/"

for (var n = 2; n <= pin_max; n++)
{
    function scope(n)
    {
        var name = "Pin_Header_Straight_1x" + n + "_PITCH_" + pin_width + "_SMT"
        var stream = fs.createWriteStream(output_dir + name + ".kicad_mod");
        stream.once('open', function(fd)
        {
            // Spawn the main node
            var main_node = spawn('node', ["build/output.js", name, n.toString(), pin_width.toString()]);
            // Print out any errors detected
            main_node.stdout.on('data', function(data) {
                stream.write(data.toString());
            });
            main_node.stdout.on('close', function(code) {
                stream.end();
                console.log("Wrote " + name + ".kicad_mod " + code);
            });
        });
    }
    scope(n);
}
