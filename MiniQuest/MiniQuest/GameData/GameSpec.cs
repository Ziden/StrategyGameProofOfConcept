using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;
using YamlDotNet.RepresentationModel;

namespace MiniQuest.GameData
{
    public class GameSpec
    {
        public void LoadGameData()
        {
            foreach(var cfgFile in GetConfigurationFiles())
            {
                var yaml = new YamlStream();
                var reader = new StreamReader(cfgFile, Encoding.UTF8);
                yaml.Load(reader);

                var mapping =
                (YamlMappingNode)yaml.Documents[0].RootNode;

                foreach (var entry in mapping.Children)
                {
                    var wolo = ((YamlScalarNode)entry.Key).Value;
                    var asd = 123;
                }

                // List all the items
                var items = (YamlSequenceNode)mapping.Children[new YamlScalarNode("items")];
                foreach (YamlMappingNode item in items)
                {
                    var i1 = item.Children[new YamlScalarNode("part_no")];
                    var i2 = item.Children[new YamlScalarNode("descrip")];
                    var asd = 123;
                }
            }        
        }

        private IEnumerable<Stream> GetConfigurationFiles()
        {
            var assembly = typeof(GameSpec).GetTypeInfo().Assembly;
            var resources = assembly.GetManifestResourceNames();
            foreach (var resource in resources)
            {
                if (resource.Contains("GameData.") && resource.EndsWith("yaml"))
                {
                    yield return assembly.GetManifestResourceStream(resource);
                }
            }
        }

    }
}
