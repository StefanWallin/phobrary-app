#!/usr/bin/env ruby
require 'dnssd'

name = "Test"
type = '_phobrary._tcp'
domain = nil
port = ENV.fetch('MOCK_SERVER_PORT', 3002).to_i
register = DNSSD::Service.register(name, type, domain, port)
puts 'Registration done, entering loop'

# Loop required to keep DNSSD::Service running and responding to queries
loop { sleep 200 }
